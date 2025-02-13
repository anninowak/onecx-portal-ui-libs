import { NgModule, ModuleWithProviders, APP_INITIALIZER, provideAppInitializer, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AUTH_SERVICE, ConfigurationService, UserService } from '@onecx/angular-integration-interface'
import { KeycloakAuthService } from './keycloak-auth.service'
import { TokenInterceptor } from './token.interceptor'
import { KEYCLOAK_AUTH_CONFIG } from './keycloak-injection-token'
import { KeycloakAngularModule } from 'keycloak-angular'

export interface KeycloakAuthModuleConfig {
  tokenInterceptorWhitelist?: string[]
}

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
  imports: [CommonModule, KeycloakAngularModule],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: KeycloakAuthService,
    },
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
