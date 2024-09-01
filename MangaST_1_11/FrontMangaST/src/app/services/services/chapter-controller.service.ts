/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addChap } from '../fn/chapter-controller/add-chap';
import { AddChap$Params } from '../fn/chapter-controller/add-chap';
import { ChapterResponse } from '../models/chapter-response';
import { findAllChaptersByMangaId } from '../fn/chapter-controller/find-all-chapters-by-manga-id';
import { FindAllChaptersByMangaId$Params } from '../fn/chapter-controller/find-all-chapters-by-manga-id';
import { findAllChaptersByPageId } from '../fn/chapter-controller/find-all-chapters-by-page-id';
import { FindAllChaptersByPageId$Params } from '../fn/chapter-controller/find-all-chapters-by-page-id';
import { findChapterByNumberAndMangaPageId } from '../fn/chapter-controller/find-chapter-by-number-and-manga-page-id';
import { FindChapterByNumberAndMangaPageId$Params } from '../fn/chapter-controller/find-chapter-by-number-and-manga-page-id';
import { loadPdfChap } from '../fn/chapter-controller/load-pdf-chap';
import { LoadPdfChap$Params } from '../fn/chapter-controller/load-pdf-chap';

@Injectable({ providedIn: 'root' })
export class ChapterControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `loadPdfChap()` */
  static readonly LoadPdfChapPath = '/chapters/loadPdfFile/{mangaId}/{chapterId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadPdfChap()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  loadPdfChap$Response(params: LoadPdfChap$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return loadPdfChap(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadPdfChap$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  loadPdfChap(params: LoadPdfChap$Params, context?: HttpContext): Observable<{
}> {
    return this.loadPdfChap$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findChapterByNumberAndMangaPageId()` */
  static readonly FindChapterByNumberAndMangaPageIdPath = '/chapters/findChapter/{pageId}/{chapterNumber}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findChapterByNumberAndMangaPageId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findChapterByNumberAndMangaPageId$Response(params: FindChapterByNumberAndMangaPageId$Params, context?: HttpContext): Observable<StrictHttpResponse<ChapterResponse>> {
    return findChapterByNumberAndMangaPageId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findChapterByNumberAndMangaPageId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findChapterByNumberAndMangaPageId(params: FindChapterByNumberAndMangaPageId$Params, context?: HttpContext): Observable<ChapterResponse> {
    return this.findChapterByNumberAndMangaPageId$Response(params, context).pipe(
      map((r: StrictHttpResponse<ChapterResponse>): ChapterResponse => r.body)
    );
  }

  /** Path part for operation `findAllChaptersByPageId()` */
  static readonly FindAllChaptersByPageIdPath = '/chapters/findAllChaptersByPageId/{pageId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllChaptersByPageId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllChaptersByPageId$Response(params: FindAllChaptersByPageId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ChapterResponse>>> {
    return findAllChaptersByPageId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllChaptersByPageId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllChaptersByPageId(params: FindAllChaptersByPageId$Params, context?: HttpContext): Observable<Array<ChapterResponse>> {
    return this.findAllChaptersByPageId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ChapterResponse>>): Array<ChapterResponse> => r.body)
    );
  }

  /** Path part for operation `findAllChaptersByMangaId()` */
  static readonly FindAllChaptersByMangaIdPath = '/chapters/findAllChapters/{mangaId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllChaptersByMangaId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllChaptersByMangaId$Response(params: FindAllChaptersByMangaId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ChapterResponse>>> {
    return findAllChaptersByMangaId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllChaptersByMangaId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllChaptersByMangaId(params: FindAllChaptersByMangaId$Params, context?: HttpContext): Observable<Array<ChapterResponse>> {
    return this.findAllChaptersByMangaId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ChapterResponse>>): Array<ChapterResponse> => r.body)
    );
  }

  /** Path part for operation `addChap()` */
  static readonly AddChapPath = '/chapters/addRequestChapter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addChap()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addChap$Response(params: AddChap$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addChap(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addChap$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addChap(params: AddChap$Params, context?: HttpContext): Observable<number> {
    return this.addChap$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
