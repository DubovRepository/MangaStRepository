/* tslint:disable */
/* eslint-disable */
import { Category } from '../models/category';
import { CommentResponse } from '../models/comment-response';
export interface MangaResponse {
  achieved?: boolean;
  authorName?: string;
  categoryList?: Array<Category>;
  comments?: Array<CommentResponse>;
  description?: string;
  id?: number;
  mangaCover?: Array<string>;
  mangaPageId?: string;
  pathTitle?: string;
  rating?: number;
  status?: 'ANNOUNCE' | 'ONGOING' | 'PAUSED' | 'COMPLETED' | 'DISCONTINUED';
  title?: string;
  typeManga?: 'MANGA' | 'MANHWA';
}
