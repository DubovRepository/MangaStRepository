import {Component, Input} from '@angular/core';
import {ChapterResponse} from "../../../../services/models/chapter-response";


@Component({
  selector: 'app-chapter-card',
  templateUrl: './chapter-card.component.html',
  styleUrl: './chapter-card.component.scss'
})
export class ChapterCardComponent {
  private _chapter: ChapterResponse = {};
  private _adm_manage_chap = false;
  private _chapterTitle: undefined | string;
  private _chapterId: undefined | number;
  private _chapterNumber: undefined | number;
  private _mangaPageId: undefined | string;

  get chapterId(): number | undefined {
    return this._chapter.id;
  }

  get chapterTitle(): string | undefined {
    return this._chapter.title;
  }


  get chapterNumber(): number | undefined {
    return this._chapter.number;
  }

  get mangaPageId(): string | undefined {
    return this._chapter.mangaPageId;
  }


  get manage(): boolean {
    return this._adm_manage_chap;
  }

  @Input()
  set manage(value: boolean) {
    this._adm_manage_chap = value;
  }

  get chapter(): ChapterResponse {
    return this._chapter;
  }

  @Input()
  set chapter(value: ChapterResponse) {
    this._chapter = value;
  }
}
