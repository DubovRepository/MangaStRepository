/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChapterResponse } from '../../models/chapter-response';

export interface FindUnverifiedChaptersByMangaId$Params {
  mangaId: number;
}

export function findUnverifiedChaptersByMangaId(http: HttpClient, rootUrl: string, params: FindUnverifiedChaptersByMangaId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ChapterResponse>>> {
  const rb = new RequestBuilder(rootUrl, findUnverifiedChaptersByMangaId.PATH, 'post');
  if (params) {
    rb.path('mangaId', params.mangaId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ChapterResponse>>;
    })
  );
}

findUnverifiedChaptersByMangaId.PATH = '/admin/check/findAllUnverifiedChaptersByMangaId/{mangaId}';
