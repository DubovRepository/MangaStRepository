/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteUntrustedChapter$Params {
  chapterId: number;
}

export function deleteUntrustedChapter(http: HttpClient, rootUrl: string, params: DeleteUntrustedChapter$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, deleteUntrustedChapter.PATH, 'post');
  if (params) {
    rb.path('chapterId', params.chapterId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

deleteUntrustedChapter.PATH = '/admin/check/deleteUntrustedChapterById/{chapterId}';
