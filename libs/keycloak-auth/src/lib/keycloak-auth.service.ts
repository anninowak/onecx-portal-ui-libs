import { ApplicationConfig, Injectable, effect, inject } from '@angular/core'
import { AppStateService, ConfigurationService, CONFIG_KEY } from '@onecx/angular-integration-interface'
import {
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  KeycloakOptions,
  createInterceptorCondition,
  includeBearerTokenInterceptor,
  provideKeycloak,
} from 'keycloak-angular'
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js'
import { filter } from 'rxjs'
import { EventsTopic } from '@onecx/integration-interface'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

const KC_REFRESH_TOKEN_LS = 'onecx_kc_refreshToken'
const KC_ID_TOKEN_LS = 'onecx_kc_idToken'
const KC_TOKEN_LS = 'onecx_kc_token'

const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i // for which url should this BearerTokenInterceptor be added?
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'keycloak-server-url',
      realm: 'realm-id',
      clientId: 'client-id',
    },
    // initOptions: {
    //   onLoad: 'check-sso',
    //   silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
    // }
    providers: [
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition],
      },
    ],
  })

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor]))
  ]}

@Injectable()
export class KeycloakAuthService {
  private keycloakService = inject(Keycloak)
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL)
  private configService = inject(ConfigurationService)
  private appStateService = inject(AppStateService)

  private eventsTopic$ = new EventsTopic()

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[])

  constructor() {
    this.eventsTopic$
      .pipe(filter((e) => e.type === 'authentication#logoutButtonClicked'))
      .subscribe(() => this.logout())

    effect(() => {
      const keycloakEvent = this.keycloakSignal()

      if (keycloakEvent.type === KeycloakEventType.AuthSuccess) {
        if (this.keycloakService.token) {
          localStorage.setItem(KC_TOKEN_LS, this.keycloakService.token)
        } else {
          localStorage.removeItem(KC_TOKEN_LS)
        }
        if (this.keycloakService.idToken) {
          localStorage.setItem(KC_ID_TOKEN_LS, this.keycloakService.idToken)
        } else {
          localStorage.removeItem(KC_ID_TOKEN_LS)
        }
        if (this.keycloakService.refreshToken) {
          localStorage.setItem(KC_REFRESH_TOKEN_LS, this.keycloakService.refreshToken)
        } else {
          localStorage.removeItem(KC_REFRESH_TOKEN_LS)
        }
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        console.log('SSO logout nav to root')
        this.clearKCStateFromLocalstorage()
        this.keycloakService.login()
      }
    })
  }

  public async init(): Promise<boolean> {
    console.time('KeycloakAuthService')
    // load previous tokens, saved after successful login of keycloak success callback
    let token = localStorage.getItem(KC_TOKEN_LS)
    let idToken = localStorage.getItem(KC_ID_TOKEN_LS)
    let refreshToken = localStorage.getItem(KC_REFRESH_TOKEN_LS)
    if (token && refreshToken) {
      const parsedToken = JSON.parse(atob(refreshToken.split('.')[1]))
      if (parsedToken.exp * 1000 < new Date().getTime()) {
        //refresh expired, drop everything
        token = null
        refreshToken = null
        idToken = null
        this.clearKCStateFromLocalstorage()
      }
    }

    this.setupEventListener()

    // try constructing the KC config from values in env
    let kcConfig: KeycloakConfig | string = this.getValidKCConfig()
    // If any of the required props is missing, fallback to loading KC conf from file
    if (!kcConfig.clientId || !kcConfig.realm || !kcConfig.url) {
      kcConfig = './assets/keycloak.json'
    }

    const enableSilentSSOCheck = this.configService.getProperty(CONFIG_KEY.KEYCLOAK_ENABLE_SILENT_SSO) === 'true'

    const kcOptions: KeycloakInitOptions = {
      // loadUserProfileAtStartUp: false,
      // config: kcConfig,

      onLoad: 'check-sso',
      checkLoginIframe: false,
      silentCheckSsoRedirectUri: enableSilentSSOCheck ? this.getSilentSSOUrl() : undefined,
      idToken: idToken || undefined,
      refreshToken: refreshToken || undefined,
      token: token || undefined,

      // enableBearerInterceptor: true,
      // bearerExcludedUrls: ['/assets'],
    }

    return this.keycloakService
      .init(kcOptions)
      .catch((err) => {
        console.log(`Keycloak err: ${err}, try force login`)
        return this.keycloakService.login()
      })
      .then((loginOk) => {
        // this will be false if our silent login did not work
        if (loginOk) {
          return this.keycloakService.getToken()
        } else {
          // we want to block bootstrap process now
          return this.keycloakService.login().then(() => 'login')
        }
      })
      .then(async () => {
        await this.appStateService.isAuthenticated$.publish()
      })
      .then(() => {
        console.timeEnd('KeycloakAuthService')
        return true
      })
      .catch((err) => {
        console.log(`KC ERROR ${err} as json ${JSON.stringify(err)}`)
        throw err
      })
  }

  private getValidKCConfig(): KeycloakConfig {
    const clientId = this.configService.getProperty(CONFIG_KEY.KEYCLOAK_CLIENT_ID)
    if (!clientId) {
      throw new Error('Invalid KC config, missing clientId')
    }
    const realm = this.configService.getProperty(CONFIG_KEY.KEYCLOAK_REALM)
    if (!realm) {
      throw new Error('Invalid KC config, missing realm')
    }
    return {
      url: this.configService.getProperty(CONFIG_KEY.KEYCLOAK_URL),
      clientId,
      realm,
    }
  }

  private setupEventListener() {
    this.keycloakService.keycloakEvents$.subscribe((ke) => {
      // we are logged in, get tokens and store them in localstorage
      if (this.keycloakService.getKeycloakInstance().token) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        localStorage.setItem(KC_TOKEN_LS, this.keycloakService.getKeycloakInstance().token!)
      } else {
        localStorage.removeItem(KC_TOKEN_LS)
      }
      if (this.keycloakService.getKeycloakInstance().idToken) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        localStorage.setItem(KC_ID_TOKEN_LS, this.keycloakService.getKeycloakInstance().idToken!)
      } else {
        localStorage.removeItem(KC_ID_TOKEN_LS)
      }
      if (this.keycloakService.getKeycloakInstance().refreshToken) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        localStorage.setItem(KC_REFRESH_TOKEN_LS, this.keycloakService.getKeycloakInstance().refreshToken!)
      } else {
        localStorage.removeItem(KC_REFRESH_TOKEN_LS)
      }
      if (ke.type === KeycloakEventType.OnAuthLogout) {
        console.log('SSO logout nav to root')
        this.clearKCStateFromLocalstorage()
        this.keycloakService.login()
      }
    })
  }

  private clearKCStateFromLocalstorage() {
    localStorage.removeItem(KC_ID_TOKEN_LS)
    localStorage.removeItem(KC_TOKEN_LS)
    localStorage.removeItem(KC_REFRESH_TOKEN_LS)
  }

  private getSilentSSOUrl() {
    let currentBase = document.getElementsByTagName('base')[0].href
    if (currentBase === '/') {
      currentBase = ''
    }
    return `${currentBase}/assets/silent-check-sso.html`
  }

  getIdToken(): string | null {
    return localStorage.getItem(KC_ID_TOKEN_LS)
  }

  logout(): void {
    this.keycloakService.logout()
  }

  getAuthProviderName(): string {
    return 'keycloak-auth'
  }

  hasRole(_role: string): boolean {
    return false
  }

  getUserRoles(): string[] {
    return []
  }
}
