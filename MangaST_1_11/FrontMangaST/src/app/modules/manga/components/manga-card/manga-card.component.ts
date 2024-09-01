import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MangaResponse} from "../../../../services/models/manga-response";


@Component({
  selector: 'app-manga-card',
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.scss'
})
export class MangaCardComponent {

  private _mangaCover: string | undefined;
  private _admin_manage = false;
  private user_manage = false;
  private _manga : MangaResponse = {};
  private _check_manage = false;
  private _list_manga = false;

  get manga(): MangaResponse {
    return this._manga;
  }

  @Input()
  set manga(value: MangaResponse) {
    this._manga = value;
  }


  get list_manga(): boolean {
    return this._list_manga;
  }
  @Input()
  set list_manga(value: boolean) {
    this._list_manga = value;
  }

  get check_manage(): boolean {
    return this._check_manage;
  }

  @Input()
  set check_manage(value: boolean) {
    this._check_manage = value;
  }

  get manage(): boolean {
    return this.user_manage;
  }

  @Input()
  set manage(value: boolean) {
    this.user_manage = value;
  }

  @Input()
  get adm_manage(): boolean {
    return this._admin_manage;
  }

  set adm_manage(value: boolean) {
    this._admin_manage = value;
  }

  get mangaCover(): string | undefined {
    if(this._manga.mangaCover) {
      return 'data:image/jpg;base64, ' + this._manga.mangaCover;
    }
    return 'https://sun1-98.userapi.com/s/v1/ig2/LfnoBVxZojzcr9YVqswNnZXMXj630tCPHJUdi94oKLPCrAyybhv-2c0M9in5Pxqq0Rli1dkZVNJlMc3ySF5pLGey.jpg?size=1800x1800&quality=95&crop=0,0,1800,1800&ava=1';
  }

  @Output() private share: EventEmitter<MangaResponse> = new EventEmitter<MangaResponse>();
  @Output() private edit: EventEmitter<MangaResponse> = new EventEmitter<MangaResponse>();
  @Output() private delete: EventEmitter<MangaResponse> = new EventEmitter<MangaResponse>();
  @Output() private details: EventEmitter<MangaResponse> = new EventEmitter<MangaResponse>();
  @Output() private info: EventEmitter<MangaResponse> = new EventEmitter<MangaResponse>();
  //@Output() private toPage: EventEmitter<MangaResponse> = new EventEmitter<MangaResponse>();

  onInfo() {
    this.info.emit(this._manga);
  }

  onShowDetails() {
    this.details.emit(this._manga)
  }

  onShare() {
    this.share.emit(this._manga)
  }

  onEdit() {
    this.edit.emit(this._manga)
  }

  onDelete() {
    this.delete.emit(this._manga)
  }
}
