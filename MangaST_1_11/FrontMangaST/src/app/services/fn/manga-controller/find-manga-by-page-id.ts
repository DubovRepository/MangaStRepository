/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MangaResponse } from '../../models/manga-response';

export interface FindMangaByPageId$Params {
  mangaPageId: string;
}

export function findMangaByPageId(http: HttpClient, rootUrl: string, params: FindMangaByPageId$Params, context?: HttpContext): Observable<StrictHttpResponse<MangaResponse>> {
  const rb = new RequestBuilder(rootUrl, findMangaByPageId.PATH, 'get');
  if (params) {
    rb.path('mangaPageId', params.mangaPageId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MangaResponse>;
    })
  );
}

findMangaByPageId.PATH = '/mangaList/find/{mangaPageId}';
