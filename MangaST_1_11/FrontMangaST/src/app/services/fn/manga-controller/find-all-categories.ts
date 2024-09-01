/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindAllCategories$Params {
}

export function findAllCategories(http: HttpClient, rootUrl: string, params?: FindAllCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<'Adventure' | 'Anthology' | 'Classic' | 'Crime' | 'Drama' | 'Fairy_Tale' | 'Fantasy' | 'Horror' | 'Mystery' | 'Romance' | 'Satire' | 'School'>>> {
  const rb = new RequestBuilder(rootUrl, findAllCategories.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<'Adventure' | 'Anthology' | 'Classic' | 'Crime' | 'Drama' | 'Fairy_Tale' | 'Fantasy' | 'Horror' | 'Mystery' | 'Romance' | 'Satire' | 'School'>>;
    })
  );
}

findAllCategories.PATH = '/mangaList/allCategories';
