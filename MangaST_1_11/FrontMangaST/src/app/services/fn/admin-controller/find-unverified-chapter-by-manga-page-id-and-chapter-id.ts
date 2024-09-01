/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChapterResponse } from '../../models/chapter-response';

export interface FindUnverifiedChapterByMangaPageIdAndChapterId$Params {
  chapterId: number;
  mangaPageId: string;
}

export function findUnverifiedChapterByMangaPageIdAndChapterId(http: HttpClient, rootUrl: string, params: FindUnverifiedChapterByMangaPageIdAndChapterId$Params, context?: HttpContext): Observable<StrictHttpResponse<ChapterResponse>> {
  const rb = new RequestBuilder(rootUrl, findUnverifiedChapterByMangaPageIdAndChapterId.PATH, 'post');
  if (params) {
    rb.path('chapterId', params.chapterId, {});
    rb.path('mangaPageId', params.mangaPageId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ChapterResponse>;
    })
  );
}

findUnverifiedChapterByMangaPageIdAndChapterId.PATH = '/admin/check/findUnverifiedChapterById/{mangaPageId}/{chapterId}';
