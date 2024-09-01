/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChapterResponse } from '../../models/chapter-response';

export interface FindChapterByNumberAndMangaPageId$Params {
  pageId: string;
  chapterNumber: number;
}

export function findChapterByNumberAndMangaPageId(http: HttpClient, rootUrl: string, params: FindChapterByNumberAndMangaPageId$Params, context?: HttpContext): Observable<StrictHttpResponse<ChapterResponse>> {
  const rb = new RequestBuilder(rootUrl, findChapterByNumberAndMangaPageId.PATH, 'post');
  if (params) {
    rb.path('pageId', params.pageId, {});
    rb.path('chapterNumber', params.chapterNumber, {});
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

findChapterByNumberAndMangaPageId.PATH = '/chapters/findChapter/{pageId}/{chapterNumber}';
