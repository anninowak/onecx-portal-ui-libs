import { TestBed } from '@angular/core/testing'
import { KeycloakService } from 'keycloak-angular'
import { ConfigurationService, CONFIG_KEY } from '@onecx/angular-integration-interface'
import { KeycloakAuthService } from './keycloak-auth.service'

describe('KeycloakAuthService', () => {
  let service: KeycloakAuthService
  let keycloakServiceSpy: KeycloakService
  let configServiceSpy: ConfigurationService

  beforeEach(() => {
    service = TestBed.inject(KeycloakAuthService)
    keycloakServiceSpy = TestBed.inject(KeycloakService)
    configServiceSpy = TestBed.inject(ConfigurationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should be initalized with correct options', async () => {
    const keycloakConfig = {
      clientId: 'client-id',
      realm: 'realm',
      url: 'http://keycloak-app',
    }
    // TODO
  })

  it('should handle token expiration correctly', async () => {
    // TODO
  })

  it('should return the access token', () => {
    const mockKeycloakInstance = { token: 'access-token' }
    jest.fn().mockReturnValue(mockKeycloakInstance)

    // TODO: Das Access Token muss initial gesetzt werden...
    const token = service.getAccessToken()
    expect(token).toBe('access-token')
  })

  it('should return the ID token', () => {
    const mockKeycloakInstance = { idToken: 'id-token' }
    jest.fn().mockReturnValue(mockKeycloakInstance)

    // TODO: Das Id Token muss initial gesetzt werden...
    const token = service.getIdToken()
    expect(token).toBe('id-token')
  })

  it('should perform logout successfully', () => {
    service.logout()
    expect(keycloakServiceSpy.logout).toHaveBeenCalled()
  })

  it('should return the correct provider name', () => {
    expect(service.getAuthProviderName()).toBe('keycloak-auth')
  })

  it('should return the correct header values', () => {
    // TODO
  })

  it('should be possible to override idpHint via optional config', () => {
    // TODO
    // expect(keycloakServiceSpy.logout).toHaveBeenCalledWith(xy)
    // partial zu testen
    // matchers.any ?
    // von den Parametern, die reinkommen, ist nur idpHint wichtig
  })
})
