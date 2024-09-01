/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Category } from '../models/category';
import { findAllMangaCategories } from '../fn/categories/find-all-manga-categories';
import { FindAllMangaCategories$Params } from '../fn/categories/find-all-manga-categories';
import { findCategoriesByMangaId } from '../fn/categories/find-categories-by-manga-id';
import { FindCategoriesByMangaId$Params } from '../fn/categories/find-categories-by-manga-id';

@Injectable({ providedIn: 'root' })
export class CategoriesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllMangaCategories()` */
  static readonly FindAllMangaCategoriesPath = '/categories/getAllCategories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllMangaCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMangaCategories$Response(params?: FindAllMangaCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Category>>> {
    return findAllMangaCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllMangaCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMangaCategories(params?: FindAllMangaCategories$Params, context?: HttpContext): Observable<Array<Category>> {
    return this.findAllMangaCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Category>>): Array<Category> => r.body)
    );
  }

  /** Path part for operation `findCategoriesByMangaId()` */
  static readonly FindCategoriesByMangaIdPath = '/categories/findCategoriesByManga';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCategoriesByMangaId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategoriesByMangaId$Response(params: FindCategoriesByMangaId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Category>>> {
    return findCategoriesByMangaId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCategoriesByMangaId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategoriesByMangaId(params: FindCategoriesByMangaId$Params, context?: HttpContext): Observable<Array<Category>> {
    return this.findCategoriesByMangaId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Category>>): Array<Category> => r.body)
    );
  }

}
