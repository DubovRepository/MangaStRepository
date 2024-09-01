/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findNickname } from '../fn/user-controller/find-nickname';
import { FindNickname$Params } from '../fn/user-controller/find-nickname';
import { findUserFavoriteList } from '../fn/user-controller/find-user-favorite-list';
import { FindUserFavoriteList$Params } from '../fn/user-controller/find-user-favorite-list';
import { infoByUser } from '../fn/user-controller/info-by-user';
import { InfoByUser$Params } from '../fn/user-controller/info-by-user';
import { isAdmin } from '../fn/user-controller/is-admin';
import { IsAdmin$Params } from '../fn/user-controller/is-admin';
import { loadNewProfileCover } from '../fn/user-controller/load-new-profile-cover';
import { LoadNewProfileCover$Params } from '../fn/user-controller/load-new-profile-cover';
import { PageResponseMangaResponse } from '../models/page-response-manga-response';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `loadNewProfileCover()` */
  static readonly LoadNewProfileCoverPath = '/user/updateProfileCover';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadNewProfileCover()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  loadNewProfileCover$Response(params?: LoadNewProfileCover$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return loadNewProfileCover(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadNewProfileCover$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  loadNewProfileCover(params?: LoadNewProfileCover$Params, context?: HttpContext): Observable<{
}> {
    return this.loadNewProfileCover$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `isAdmin()` */
  static readonly IsAdminPath = '/user/isAdmin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  isAdmin$Response(params?: IsAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return isAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isAdmin(params?: IsAdmin$Params, context?: HttpContext): Observable<boolean> {
    return this.isAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `findNickname()` */
  static readonly FindNicknamePath = '/user/findNickname';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findNickname()` instead.
   *
   * This method doesn't expect any request body.
   */
  findNickname$Response(params?: FindNickname$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return findNickname(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findNickname$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findNickname(params?: FindNickname$Params, context?: HttpContext): Observable<string> {
    return this.findNickname$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `infoByUser()` */
  static readonly InfoByUserPath = '/user/find/infoUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `infoByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  infoByUser$Response(params?: InfoByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return infoByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `infoByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  infoByUser(params?: InfoByUser$Params, context?: HttpContext): Observable<UserResponse> {
    return this.infoByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `findUserFavoriteList()` */
  static readonly FindUserFavoriteListPath = '/user/find/favoriteList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserFavoriteList()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserFavoriteList$Response(params?: FindUserFavoriteList$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
    return findUserFavoriteList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserFavoriteList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserFavoriteList(params?: FindUserFavoriteList$Params, context?: HttpContext): Observable<PageResponseMangaResponse> {
    return this.findUserFavoriteList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMangaResponse>): PageResponseMangaResponse => r.body)
    );
  }

}
