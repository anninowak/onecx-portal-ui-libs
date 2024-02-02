import { HttpClient } from '@angular/common/http'
import { TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { filter, first, mergeMap, Observable, of } from 'rxjs'
import { TranslationCacheService } from '../../services/translation-cache.service'

export class CachingTranslateLoader implements TranslateLoader {
  private translateLoader = new TranslateHttpLoader(this.http, this.prefix, this.suffix)

  constructor(
    private translationCache: TranslationCacheService,
    private http: HttpClient,
    private prefix?: string,
    private suffix?: string
  ) {}

  getTranslation(lang: string): Observable<any> {
    const url = `${this.prefix}${lang}${this.suffix}`

    return this.translationCache.getTranslationFile(url).pipe(
      filter((tf) => tf !== null),
      first(),
      mergeMap((tf) => {
        if (tf) {
          return of(tf)
        }
        return this.translationCache.updateTranslationFile(url, null).pipe(
          mergeMap(() => this.translateLoader.getTranslation(lang)),
          mergeMap((t) => this.translationCache.updateTranslationFile(url, t))
        )
      })
    )
  }
}