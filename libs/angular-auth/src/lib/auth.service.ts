export interface AuthService {
  init(config?: Record<string, unknown>): Promise<boolean>

  getHeaderValues(): Record<string, string>

  logout(): void
}

export enum Injectables {
  KEYCLOAK_AUTH_SERVICE = 'KEYCLOAK_AUTH_SERVICE',
  CONFIG = 'CONFIG',
  HTTP_CLIENT = 'HTTP_CLIENT',
}

export type AuthServiceFactory = (injectorFunction: (injectable: Injectables) => unknown) => AuthService
