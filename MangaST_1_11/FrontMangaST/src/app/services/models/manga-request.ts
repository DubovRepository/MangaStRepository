/* tslint:disable */
/* eslint-disable */
import { Category } from '../models/category';
export interface MangaRequest {
  authorName: string;
  description: string;
  mangaCategories: Array<Category>;
  status?: 'ANNOUNCE' | 'ONGOING' | 'PAUSED' | 'COMPLETED' | 'DISCONTINUED';
  title: string;
  typeManga?: 'MANGA' | 'MANHWA';
}
