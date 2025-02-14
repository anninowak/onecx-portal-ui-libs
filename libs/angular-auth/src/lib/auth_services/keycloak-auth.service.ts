import { Injectable, effect, inject } from '@angular/core'
import { ConfigurationService, CONFIG_KEY } from '@onecx/angular-integration-interface'
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, KeycloakOptions, KeycloakService } from 'keycloak-angular'
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js'
import { AuthService } from '../auth.service'
import Keycloak from 'keycloak-js'

const KC_REFRESH_TOKEN_LS = 'onecx_kc_refreshToken'
const KC_ID_TOKEN_LS = 'onecx_kc_idToken'
const KC_TOKEN_LS = 'onecx_kc_token'

@Injectable()
export class KeycloakAuthService implements AuthService {
  private keycloakService = inject(Keycloak)
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL)
  private configService = inject(ConfigurationService)

  kcConfig?: Record<string, unknown>

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[])

  constructor() {
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

  public async init(config?: Record<string, unknown>): Promise<boolean> {
    console.time('KeycloakAuthService')
    this.kcConfig = config
    let token = localStorage.getItem(KC_TOKEN_LS)
    let idToken = localStorage.getItem(KC_ID_TOKEN_LS)
    let refreshToken = localStorage.getItem(KC_REFRESH_TOKEN_LS)
    if (token && refreshToken) {
      const parsedToken = JSON.parse(atob(refreshToken.split('.')[1]))
      if (parsedToken.exp * 1000 < new Date().getTime()) {
        token = null
        refreshToken = null
        idToken = null
        this.clearKCStateFromLocalstorage()
      }
    }

    // this.setupEventListener()

    let kcConfig: KeycloakConfig | string = { ...this.getValidKCConfig(), ...(config ?? {}) }

    if (kcConfig.clientId && kcConfig.realm && kcConfig.url) {
      this.keycloakService.authServerUrl = kcConfig.url
      this.keycloakService.realm = kcConfig.realm
      this.keycloakService.clientId = kcConfig.clientId
    }

    const enableSilentSSOCheck = this.configService.getProperty(CONFIG_KEY.KEYCLOAK_ENABLE_SILENT_SSO) === 'true'

    const kcOptions: KeycloakInitOptions = {
      // loadUserProfileAtStartUp: false,
      // config: kcConfig,
      // initOptions: {
      onLoad: 'check-sso',
      checkLoginIframe: false,
      silentCheckSsoRedirectUri: enableSilentSSOCheck ? this.getSilentSSOUrl() : undefined,
      idToken: idToken || undefined,
      refreshToken: refreshToken || undefined,
      token: token || undefined,
      // },
      // enableBearerInterceptor: false,
      // bearerExcludedUrls: ['/assets'],
    }

    return this.keycloakService
      .init(kcOptions)
      .catch((err) => {
        console.log(`Keycloak err: ${err}, try force login`)
        return this.keycloakService.login(config)
      })
      .then((loginOk) => {
        if (loginOk) {
          return this.keycloakService.token
        } else {
          return this.keycloakService.login(config).then(() => 'login')
        }
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

  protected getValidKCConfig(): KeycloakConfig {
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

  // private setupEventListener() {
    // this.keycloakService.keycloakEvents$.subscribe((ke) => {
    //   if (this.keycloakService.getKeycloakInstance().token) {
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     localStorage.setItem(KC_TOKEN_LS, this.keycloakService.getKeycloakInstance().token!)
    //   } else {
    //     localStorage.removeItem(KC_TOKEN_LS)
    //   }
    //   if (this.keycloakService.getKeycloakInstance().idToken) {
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     localStorage.setItem(KC_ID_TOKEN_LS, this.keycloakService.getKeycloakInstance().idToken!)
    //   } else {
    //     localStorage.removeItem(KC_ID_TOKEN_LS)
    //   }
    //   if (this.keycloakService.getKeycloakInstance().refreshToken) {
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     localStorage.setItem(KC_REFRESH_TOKEN_LS, this.keycloakService.getKeycloakInstance().refreshToken!)
    //   } else {
    //     localStorage.removeItem(KC_REFRESH_TOKEN_LS)
    //   }
    //   if (ke.type === KeycloakEventType.OnAuthLogout) {
    //     console.log('SSO logout nav to root')
    //     this.clearKCStateFromLocalstorage()
    //     this.keycloakService.login(this.kcConfig)
    //   }
    // })
  // }

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
    return this.keycloakService.idToken ?? null
  }
  getAccessToken(): string | null {
    return this.keycloakService.token ?? null
  }

  logout(): void {
    this.keycloakService.logout()
  }

  async updateTokenIfNeeded(): Promise<boolean> {
    if (!this.keycloakService.authenticated) {
      return this.keycloakService.login(this.kcConfig).then(() => false)
    } else {
      return this.keycloakService.updateToken()
    }
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

  getHeaderValues(): Record<string, string> {
    return { 'apm-principal-token': this.getIdToken() ?? '', Authorization: `Bearer ${this.getAccessToken()}` }
  }
}
