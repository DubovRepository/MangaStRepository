/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addToFavorite } from '../fn/manga-controller/add-to-favorite';
import { AddToFavorite$Params } from '../fn/manga-controller/add-to-favorite';
import { deleteFromFavorite } from '../fn/manga-controller/delete-from-favorite';
import { DeleteFromFavorite$Params } from '../fn/manga-controller/delete-from-favorite';
import { findAllCategories } from '../fn/manga-controller/find-all-categories';
import { FindAllCategories$Params } from '../fn/manga-controller/find-all-categories';
import { findAllFavoriteMangaByUser } from '../fn/manga-controller/find-all-favorite-manga-by-user';
import { FindAllFavoriteMangaByUser$Params } from '../fn/manga-controller/find-all-favorite-manga-by-user';
import { findAllManga } from '../fn/manga-controller/find-all-manga';
import { FindAllManga$Params } from '../fn/manga-controller/find-all-manga';
import { findAllStatus } from '../fn/manga-controller/find-all-status';
import { FindAllStatus$Params } from '../fn/manga-controller/find-all-status';
import { findByTitle } from '../fn/manga-controller/find-by-title';
import { FindByTitle$Params } from '../fn/manga-controller/find-by-title';
import { findMangaByPageId } from '../fn/manga-controller/find-manga-by-page-id';
import { FindMangaByPageId$Params } from '../fn/manga-controller/find-manga-by-page-id';
import { MangaResponse } from '../models/manga-response';
import { PageResponseMangaResponse } from '../models/page-response-manga-response';

@Injectable({ providedIn: 'root' })
export class MangaControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addToFavorite()` */
  static readonly AddToFavoritePath = '/mangaList/addToFavorite/{manga-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addToFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  addToFavorite$Response(params: AddToFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addToFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addToFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addToFavorite(params: AddToFavorite$Params, context?: HttpContext): Observable<void> {
    return this.addToFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findMangaByPageId()` */
  static readonly FindMangaByPageIdPath = '/mangaList/find/{mangaPageId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMangaByPageId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMangaByPageId$Response(params: FindMangaByPageId$Params, context?: HttpContext): Observable<StrictHttpResponse<MangaResponse>> {
    return findMangaByPageId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMangaByPageId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMangaByPageId(params: FindMangaByPageId$Params, context?: HttpContext): Observable<MangaResponse> {
    return this.findMangaByPageId$Response(params, context).pipe(
      map((r: StrictHttpResponse<MangaResponse>): MangaResponse => r.body)
    );
  }

  /** Path part for operation `findByTitle()` */
  static readonly FindByTitlePath = '/mangaList/find/findTitle/{title}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByTitle()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByTitle$Response(params: FindByTitle$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
    return findByTitle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByTitle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByTitle(params: FindByTitle$Params, context?: HttpContext): Observable<PageResponseMangaResponse> {
    return this.findByTitle$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMangaResponse>): PageResponseMangaResponse => r.body)
    );
  }

  /** Path part for operation `findAllManga()` */
  static readonly FindAllMangaPath = '/mangaList/find/findAllManga';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllManga()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllManga$Response(params?: FindAllManga$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
    return findAllManga(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllManga$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllManga(params?: FindAllManga$Params, context?: HttpContext): Observable<PageResponseMangaResponse> {
    return this.findAllManga$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMangaResponse>): PageResponseMangaResponse => r.body)
    );
  }

  /** Path part for operation `findAllStatus()` */
  static readonly FindAllStatusPath = '/mangaList/find/findAllMangaStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStatus$Response(params?: FindAllStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<'ANNOUNCE' | 'ONGOING' | 'PAUSED' | 'COMPLETED' | 'DISCONTINUED'>>> {
    return findAllStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllStatus(params?: FindAllStatus$Params, context?: HttpContext): Observable<Array<'ANNOUNCE' | 'ONGOING' | 'PAUSED' | 'COMPLETED' | 'DISCONTINUED'>> {
    return this.findAllStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<'ANNOUNCE' | 'ONGOING' | 'PAUSED' | 'COMPLETED' | 'DISCONTINUED'>>): Array<'ANNOUNCE' | 'ONGOING' | 'PAUSED' | 'COMPLETED' | 'DISCONTINUED'> => r.body)
    );
  }

  /** Path part for operation `findAllFavoriteMangaByUser()` */
  static readonly FindAllFavoriteMangaByUserPath = '/mangaList/favorite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFavoriteMangaByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFavoriteMangaByUser$Response(params?: FindAllFavoriteMangaByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
    return findAllFavoriteMangaByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFavoriteMangaByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFavoriteMangaByUser(params?: FindAllFavoriteMangaByUser$Params, context?: HttpContext): Observable<PageResponseMangaResponse> {
    return this.findAllFavoriteMangaByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMangaResponse>): PageResponseMangaResponse => r.body)
    );
  }

  /** Path part for operation `findAllCategories()` */
  static readonly FindAllCategoriesPath = '/mangaList/allCategories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCategories$Response(params?: FindAllCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<'Adventure' | 'Anthology' | 'Classic' | 'Crime' | 'Drama' | 'Fairy_Tale' | 'Fantasy' | 'Horror' | 'Mystery' | 'Romance' | 'Satire' | 'School'>>> {
    return findAllCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCategories(params?: FindAllCategories$Params, context?: HttpContext): Observable<Array<'Adventure' | 'Anthology' | 'Classic' | 'Crime' | 'Drama' | 'Fairy_Tale' | 'Fantasy' | 'Horror' | 'Mystery' | 'Romance' | 'Satire' | 'School'>> {
    return this.findAllCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<'Adventure' | 'Anthology' | 'Classic' | 'Crime' | 'Drama' | 'Fairy_Tale' | 'Fantasy' | 'Horror' | 'Mystery' | 'Romance' | 'Satire' | 'School'>>): Array<'Adventure' | 'Anthology' | 'Classic' | 'Crime' | 'Drama' | 'Fairy_Tale' | 'Fantasy' | 'Horror' | 'Mystery' | 'Romance' | 'Satire' | 'School'> => r.body)
    );
  }

  /** Path part for operation `deleteFromFavorite()` */
  static readonly DeleteFromFavoritePath = '/mangaList/deleteFromFavorite/{manga-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFromFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFromFavorite$Response(params: DeleteFromFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteFromFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFromFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFromFavorite(params: DeleteFromFavorite$Params, context?: HttpContext): Observable<void> {
    return this.deleteFromFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
