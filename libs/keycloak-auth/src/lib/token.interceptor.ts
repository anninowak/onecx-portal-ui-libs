import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import Keycloak from 'keycloak-js'
import { Observable } from 'rxjs'
import { KeycloakAuthModuleConfig } from './keycloak-auth.module'
import { KEYCLOAK_AUTH_CONFIG } from './keycloak-injection-token'

const WHITELIST = ['assets']

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService = inject(Keycloak)
  private kcModuleConfig = inject<KeycloakAuthModuleConfig>(KEYCLOAK_AUTH_CONFIG, { optional: true })!

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[])

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skip = (this.kcModuleConfig?.tokenInterceptorWhitelist || WHITELIST).some((str) => request.url.includes(str))
    if (skip) {
      return next.handle(request)
    }

    const idToken = this.authService.idToken
    if (idToken) {
      const authenticatedReq: HttpRequest<unknown> = request.clone({
        headers: request.headers.set('apm-principal-token', idToken),
      })
      return next.handle(authenticatedReq)
    } else {
      return next.handle(request)
    }
  }
}
