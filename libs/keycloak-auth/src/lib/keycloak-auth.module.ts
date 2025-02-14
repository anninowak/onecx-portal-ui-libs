import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http'
import { ModuleWithProviders, NgModule, inject, provideAppInitializer } from '@angular/core'
import { ConfigurationService, UserService } from '@onecx/angular-integration-interface'
import {
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  createInterceptorCondition,
  includeBearerTokenInterceptor,
  provideKeycloak,
} from 'keycloak-angular'
import { KeycloakAuthService } from './keycloak-auth.service'
import { KEYCLOAK_AUTH_CONFIG } from './keycloak-injection-token'
import { TokenInterceptor } from './token.interceptor'

export interface KeycloakAuthModuleConfig {
  tokenInterceptorWhitelist?: string[]
}

const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  // ^(?!.*\bassets\b).*
  urlPattern: /^(?!.*\bassets\b).*/i,
})

function appInitializer(configService: ConfigurationService, authService: KeycloakAuthService) {
  return async () => {
    await configService.isInitialized
    await authService.init()
  }
}

/**
 * Authentication module for keycloak. Requires @onecx/angular-integration-interfacer and keycloak-js to work.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    // {
    //   provide: AUTH_SERVICE,
    //   useClass: KeycloakAuthService,
    // },
    // https://github.com/mauriciovigolo/keycloak-angular/issues/604#issuecomment-2629286093
    provideKeycloak({
      config: './assets/keycloak.json' as any,
      providers: [
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [localhostCondition],
        },
      ],
    }),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // { provide: APP_INITIALIZER, useFactory: appInitializer, deps: [ConfigurationService, AUTH_SERVICE], multi: true },
    provideAppInitializer(async () => appInitializer(inject(ConfigurationService), inject(KeycloakAuthService))),
  ],
})
export class KeycloakAuthModule {
  userService: UserService = inject(UserService)
  static withConfig(config: KeycloakAuthModuleConfig): ModuleWithProviders<KeycloakAuthModule> {
    return {
      ngModule: KeycloakAuthModule,
      providers: [
        // {
        //   provide: AUTH_SERVICE,
        //   useClass: KeycloakAuthService,
        // },
        provideKeycloak({
          config: './assets/keycloak.json' as any,
          providers: [
            {
              provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
              useValue: [localhostCondition],
            },
          ],
        }),
        provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: KEYCLOAK_AUTH_CONFIG, useValue: config },
        // {
        //   provide: APP_INITIALIZER,
        //   useFactory: appInitializer,
        //   deps: [ConfigurationService, AUTH_SERVICE],
        //   multi: true,
        // },
        provideAppInitializer(async () => appInitializer(inject(ConfigurationService), inject(KeycloakAuthService))),
      ],
    }
  }
}
