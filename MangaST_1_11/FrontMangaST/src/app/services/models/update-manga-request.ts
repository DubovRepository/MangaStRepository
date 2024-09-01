/* tslint:disable */
/* eslint-disable */
import { Category } from '../models/category';
export interface UpdateMangaRequest {
  authorName: string;
  categoryList: Array<Category>;
  description: string;
  id?: number;
  status?: 'ANNOUNCE' | 'ONGOING' | 'PAUSED' | 'COMPLETED' | 'DISCONTINUED';
  title: string;
  typeManga?: 'MANGA' | 'MANHWA';
}
