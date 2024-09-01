/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChapterResponse } from '../../models/chapter-response';

export interface FindAllChaptersByPageId$Params {
  pageId: string;
}

export function findAllChaptersByPageId(http: HttpClient, rootUrl: string, params: FindAllChaptersByPageId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ChapterResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllChaptersByPageId.PATH, 'post');
  if (params) {
    rb.path('pageId', params.pageId, {});
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

findAllChaptersByPageId.PATH = '/chapters/findAllChaptersByPageId/{pageId}';
