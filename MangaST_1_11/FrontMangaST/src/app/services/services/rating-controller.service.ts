/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { rateManga } from '../fn/rating-controller/rate-manga';
import { RateManga$Params } from '../fn/rating-controller/rate-manga';

@Injectable({ providedIn: 'root' })
export class RatingControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `rateManga()` */
  static readonly RateMangaPath = '/rating/addRating';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rateManga()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rateManga$Response(params: RateManga$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return rateManga(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rateManga$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rateManga(params: RateManga$Params, context?: HttpContext): Observable<{
}> {
    return this.rateManga$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
