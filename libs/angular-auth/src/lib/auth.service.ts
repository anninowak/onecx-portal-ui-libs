export interface AuthService {
  init(config?: Record<string, unknown>): Promise<boolean | undefined>

  getHeaderValues(): Record<string, string>

  logout(): void

  updateTokenIfNeeded(): Promise<boolean>
}

export enum Injectables {
  KEYCLOAK_AUTH_SERVICE = 'KEYCLOAK_AUTH_SERVICE',
  CONFIG = 'CONFIG',
}

export type AuthServiceFactory = (injectorFunction: (injectable: Injectables) => unknown) => AuthService
