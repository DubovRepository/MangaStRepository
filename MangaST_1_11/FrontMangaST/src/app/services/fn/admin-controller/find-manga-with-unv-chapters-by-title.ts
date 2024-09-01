/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseMangaResponse } from '../../models/page-response-manga-response';

export interface FindMangaWithUnvChaptersByTitle$Params {
  mangaTitle: string;
  page?: number;
  size?: number;
}

export function findMangaWithUnvChaptersByTitle(http: HttpClient, rootUrl: string, params: FindMangaWithUnvChaptersByTitle$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
  const rb = new RequestBuilder(rootUrl, findMangaWithUnvChaptersByTitle.PATH, 'post');
  if (params) {
    rb.path('mangaTitle', params.mangaTitle, {});
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

findMangaWithUnvChaptersByTitle.PATH = '/admin/check/findMangaWithUnverifiedChaptersByTitle/{mangaTitle}';
