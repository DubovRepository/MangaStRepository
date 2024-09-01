/* tslint:disable */
/* eslint-disable */
import { MangaResponse } from '../models/manga-response';
export interface PageResponseMangaResponse {
  first?: boolean;
  last?: boolean;
  listManga?: Array<MangaResponse>;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
