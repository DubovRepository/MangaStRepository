/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addManga } from '../fn/admin-controller/add-manga';
import { AddManga$Params } from '../fn/admin-controller/add-manga';
import { ChapterResponse } from '../models/chapter-response';
import { deleteMangaById } from '../fn/admin-controller/delete-manga-by-id';
import { DeleteMangaById$Params } from '../fn/admin-controller/delete-manga-by-id';
import { deleteUntrustedChapter } from '../fn/admin-controller/delete-untrusted-chapter';
import { DeleteUntrustedChapter$Params } from '../fn/admin-controller/delete-untrusted-chapter';
import { findAllMangaWithUnverifiedChapters } from '../fn/admin-controller/find-all-manga-with-unverified-chapters';
import { FindAllMangaWithUnverifiedChapters$Params } from '../fn/admin-controller/find-all-manga-with-unverified-chapters';
import { findMangaWithUnvChaptersByTitle } from '../fn/admin-controller/find-manga-with-unv-chapters-by-title';
import { FindMangaWithUnvChaptersByTitle$Params } from '../fn/admin-controller/find-manga-with-unv-chapters-by-title';
import { findUnverifiedChapterByMangaPageIdAndChapterId } from '../fn/admin-controller/find-unverified-chapter-by-manga-page-id-and-chapter-id';
import { FindUnverifiedChapterByMangaPageIdAndChapterId$Params } from '../fn/admin-controller/find-unverified-chapter-by-manga-page-id-and-chapter-id';
import { findUnverifiedChaptersByMangaId } from '../fn/admin-controller/find-unverified-chapters-by-manga-id';
import { FindUnverifiedChaptersByMangaId$Params } from '../fn/admin-controller/find-unverified-chapters-by-manga-id';
import { loadCover } from '../fn/admin-controller/load-cover';
import { LoadCover$Params } from '../fn/admin-controller/load-cover';
import { PageResponseMangaResponse } from '../models/page-response-manga-response';
import { setTrustChapter } from '../fn/admin-controller/set-trust-chapter';
import { SetTrustChapter$Params } from '../fn/admin-controller/set-trust-chapter';
import { updateManga } from '../fn/admin-controller/update-manga';
import { UpdateManga$Params } from '../fn/admin-controller/update-manga';

@Injectable({ providedIn: 'root' })
export class AdminControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateManga()` */
  static readonly UpdateMangaPath = '/admin/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateManga()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateManga$Response(params: UpdateManga$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateManga(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateManga$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateManga(params: UpdateManga$Params, context?: HttpContext): Observable<number> {
    return this.updateManga$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `loadCover()` */
  static readonly LoadCoverPath = '/admin/loadMangaCover/{mangaId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadCover()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  loadCover$Response(params: LoadCover$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return loadCover(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadCover$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  loadCover(params: LoadCover$Params, context?: HttpContext): Observable<{
}> {
    return this.loadCover$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findUnverifiedChapterByMangaPageIdAndChapterId()` */
  static readonly FindUnverifiedChapterByMangaPageIdAndChapterIdPath = '/admin/check/findUnverifiedChapterById/{mangaPageId}/{chapterId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUnverifiedChapterByMangaPageIdAndChapterId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUnverifiedChapterByMangaPageIdAndChapterId$Response(params: FindUnverifiedChapterByMangaPageIdAndChapterId$Params, context?: HttpContext): Observable<StrictHttpResponse<ChapterResponse>> {
    return findUnverifiedChapterByMangaPageIdAndChapterId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUnverifiedChapterByMangaPageIdAndChapterId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUnverifiedChapterByMangaPageIdAndChapterId(params: FindUnverifiedChapterByMangaPageIdAndChapterId$Params, context?: HttpContext): Observable<ChapterResponse> {
    return this.findUnverifiedChapterByMangaPageIdAndChapterId$Response(params, context).pipe(
      map((r: StrictHttpResponse<ChapterResponse>): ChapterResponse => r.body)
    );
  }

  /** Path part for operation `findMangaWithUnvChaptersByTitle()` */
  static readonly FindMangaWithUnvChaptersByTitlePath = '/admin/check/findMangaWithUnverifiedChaptersByTitle/{mangaTitle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMangaWithUnvChaptersByTitle()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMangaWithUnvChaptersByTitle$Response(params: FindMangaWithUnvChaptersByTitle$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
    return findMangaWithUnvChaptersByTitle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMangaWithUnvChaptersByTitle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMangaWithUnvChaptersByTitle(params: FindMangaWithUnvChaptersByTitle$Params, context?: HttpContext): Observable<PageResponseMangaResponse> {
    return this.findMangaWithUnvChaptersByTitle$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMangaResponse>): PageResponseMangaResponse => r.body)
    );
  }

  /** Path part for operation `findUnverifiedChaptersByMangaId()` */
  static readonly FindUnverifiedChaptersByMangaIdPath = '/admin/check/findAllUnverifiedChaptersByMangaId/{mangaId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUnverifiedChaptersByMangaId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUnverifiedChaptersByMangaId$Response(params: FindUnverifiedChaptersByMangaId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ChapterResponse>>> {
    return findUnverifiedChaptersByMangaId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUnverifiedChaptersByMangaId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUnverifiedChaptersByMangaId(params: FindUnverifiedChaptersByMangaId$Params, context?: HttpContext): Observable<Array<ChapterResponse>> {
    return this.findUnverifiedChaptersByMangaId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ChapterResponse>>): Array<ChapterResponse> => r.body)
    );
  }

  /** Path part for operation `findAllMangaWithUnverifiedChapters()` */
  static readonly FindAllMangaWithUnverifiedChaptersPath = '/admin/check/findAllMangaWithUnverifiedChapters';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllMangaWithUnverifiedChapters()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMangaWithUnverifiedChapters$Response(params?: FindAllMangaWithUnverifiedChapters$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMangaResponse>> {
    return findAllMangaWithUnverifiedChapters(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllMangaWithUnverifiedChapters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMangaWithUnverifiedChapters(params?: FindAllMangaWithUnverifiedChapters$Params, context?: HttpContext): Observable<PageResponseMangaResponse> {
    return this.findAllMangaWithUnverifiedChapters$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMangaResponse>): PageResponseMangaResponse => r.body)
    );
  }

  /** Path part for operation `deleteUntrustedChapter()` */
  static readonly DeleteUntrustedChapterPath = '/admin/check/deleteUntrustedChapterById/{chapterId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUntrustedChapter()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUntrustedChapter$Response(params: DeleteUntrustedChapter$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteUntrustedChapter(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUntrustedChapter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUntrustedChapter(params: DeleteUntrustedChapter$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteUntrustedChapter$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `setTrustChapter()` */
  static readonly SetTrustChapterPath = '/admin/check/approveChapterById/{chapterId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setTrustChapter()` instead.
   *
   * This method doesn't expect any request body.
   */
  setTrustChapter$Response(params: SetTrustChapter$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return setTrustChapter(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setTrustChapter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setTrustChapter(params: SetTrustChapter$Params, context?: HttpContext): Observable<{
}> {
    return this.setTrustChapter$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `addManga()` */
  static readonly AddMangaPath = '/admin/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addManga()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addManga$Response(params: AddManga$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addManga(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addManga$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addManga(params: AddManga$Params, context?: HttpContext): Observable<number> {
    return this.addManga$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteMangaById()` */
  static readonly DeleteMangaByIdPath = '/admin/delete/{manga-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMangaById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMangaById$Response(params: DeleteMangaById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteMangaById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteMangaById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMangaById(params: DeleteMangaById$Params, context?: HttpContext): Observable<void> {
    return this.deleteMangaById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
