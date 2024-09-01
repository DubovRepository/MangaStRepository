import { Injectable } from '@angular/core';
import {MangaResponse} from "../../services/models/manga-response";

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private _manga: MangaResponse = {};
  constructor() { }


  get manga(): MangaResponse {
    return this._manga;
    this._manga = {};
  }

  set manga(value: MangaResponse) {
    this._manga = value;
  }
}
