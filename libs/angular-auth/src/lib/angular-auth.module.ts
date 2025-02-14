import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule, inject, provideAppInitializer } from '@angular/core'
import { ConfigurationService } from '@onecx/angular-integration-interface'
import { provideKeycloak } from 'keycloak-angular'
import Keycloak from 'keycloak-js'
import { AuthProxyService } from './auth-proxy.service'
import { AuthServiceWrapper } from './auth-service-wrapper'
import { AuthService } from './auth.service'
import { KeycloakAuthService } from './auth_services/keycloak-auth.service'
import { TokenInterceptor } from './token.interceptor'

// const provideKeycloakInAppInitializer = (
//   keycloak: Keycloak,
//   options?: ProvideKeycloakOptions
// ): EnvironmentProviders | Provider[] => {
//   const { initOptions, features } = options ?? {}

//   if (!initOptions) {
//     return []
//   }

//   return provideAppInitializer(async () => {
//     const injector = inject(EnvironmentInjector)
//     runInInjectionContext(injector, () => features?.forEach((feature) => feature.configure()))
//     await keycloak.init(initOptions).catch((error) => console.error('Keycloak initialization failed', error))
//   })
// }

// // based on keycloak-angular provideKeycloak
// // workaround for: ProvideKeycloakOptions does not allow options.config to be a string
// function provideKeycloakOnecx(options?: ProvideKeycloakOptions): EnvironmentProviders {
//   const keycloak = new Keycloak(options?.config ?? './assets/keycloak.json')

//   const providers = options?.providers ?? []
//   const keycloakSignal = createKeycloakSignal(keycloak)

//   return makeEnvironmentProviders([
//     {
//       provide: KEYCLOAK_EVENT_SIGNAL,
//       useValue: keycloakSignal,
//     },
//     {
//       provide: Keycloak,
//       useValue: keycloak,
//     },
//     ...providers,
//     provideKeycloakInAppInitializer(keycloak, options),
//   ])
// }

function appInitializer(configService: ConfigurationService, authService: AuthService) {
  return async () => {
    await configService.isInitialized
    await authService.init()
  }
}

function provideAuthServices() {
  return [AuthServiceWrapper, KeycloakAuthService, Keycloak]
}

export function provideAuthService() {
  return [
    provideAuthServices(),
    // provideKeycloakOnecx(),
    // https://github.com/mauriciovigolo/keycloak-angular/issues/604#issuecomment-2629286093
    provideKeycloak({
      config: './assets/keycloak.json' as any,
    }),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   deps: [ConfigurationService, AuthServiceWrapper],
    //   multi: true,
    // },
    provideAppInitializer(async () => appInitializer(inject(ConfigurationService), inject(AuthServiceWrapper))),
  ]
}

export function provideTokenInterceptor() {
  return [
    AuthProxyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ]
}

@NgModule({
  imports: [CommonModule],
  providers: [
    provideTokenInterceptor(),
    provideAuthServices(), // Only needed as fallback if shell uses lib version without new auth mechanism
  ],
})
export class AngularAuthModule {}
