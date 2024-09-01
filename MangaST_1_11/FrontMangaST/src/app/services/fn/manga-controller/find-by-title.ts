/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseMangaResponse } from '../../models/page-response-manga-response';

export interface FindByTitle$Params {
  page?: number;
  size?: number;
  title: string;
}

export function findByTitle(http: HttpClient, rootUrl: string, params: FindByTitle$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
  const rb = new RequestBuilder(rootUrl, findByTitle.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('title', params.title, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseMangaResponse>;
    })
  );
}

findByTitle.PATH = '/mangaList/find/findTitle/{title}';
