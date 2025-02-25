import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UserProfile } from '@onecx/integration-interface'
import { DEFAULT_LANG } from '../src/lib/api/constants'
import { FakeTopic } from './fake-topic'

@Injectable({ providedIn: 'root' })
export class UserServiceMock {
  profile$ = new FakeTopic<UserProfile>()
  permissions$ = new BehaviorSubject<string[]>(['mocked-permission'])
  lang$ = new BehaviorSubject(DEFAULT_LANG)

  hasPermission(permissionKey: string | string[]): boolean {
    return true
  }
  lacksPermission(permissionKey: string | string[]): boolean {
    return true
  }
  determineLanguage(): string | undefined {
    return 'mocked-lang'
  }

  extractPermissions(userProfile: UserProfile): string[] | null {
    return ['mocked-permission']
  }

  get isInitialized(): Promise<void> {
    return Promise.resolve()
  }
}
