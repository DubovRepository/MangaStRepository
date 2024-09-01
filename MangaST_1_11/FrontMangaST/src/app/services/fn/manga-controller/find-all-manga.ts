/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseMangaResponse } from '../../models/page-response-manga-response';

export interface FindAllManga$Params {
  page?: number;
  size?: number;
}

export function findAllManga(http: HttpClient, rootUrl: string, params?: FindAllManga$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllManga.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
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

findAllManga.PATH = '/mangaList/find/findAllManga';
