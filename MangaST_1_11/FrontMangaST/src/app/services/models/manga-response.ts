/* tslint:disable */
/* eslint-disable */
export interface MangaResponse {
  achieved?: boolean;
  authorName?: string;
  description?: string;
  id?: number;
  mangaCover?: Array<string>;
  mangaPageId?: string;
  pathTitle?: string;
  status?: 'ANNOUNCE' | 'ONGOING' | 'PAUSED' | 'COMPLETED' | 'DISCONTINUED';
  title?: string;
  typeManga?: 'MANGA' | 'MANHWA';
}
