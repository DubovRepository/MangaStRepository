import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {TokenService} from "../../../../servicesT/token/token.service";
import {AdminService} from "../../../../servicesT/admin/admin.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {ChapterControllerService} from "../../../../services/services/chapter-controller.service";
import {MangaResponse} from "../../../../services/models/manga-response";
import {ChapterResponse} from "../../../../services/models/chapter-response";
import {AdminControllerService} from "../../../../services/services/admin-controller.service";


@Component({
  selector: 'app-manga-lobby-requests',
  templateUrl: './manga-lobby-requests.component.html',
  styleUrl: './manga-lobby-requests.component.scss'
})
export class MangaLobbyRequestsComponent implements OnInit {
  isAuthorization = false;
  _manga: MangaResponse = {};
  pageId = '';
  errorMsg = '';
  pageError = '';
  chaptersError = '';
  private _mangaPageCover: undefined | string;
  sectionParam = '';
  isChapters = false;
  _chaptersByManga: Array<ChapterResponse> = [];

  constructor(
    private mangaService: MangaControllerService,
    private activatedRoute: ActivatedRoute,
    private chapterService: ChapterControllerService,
    private tokenService: TokenService,
    private router: Router,
    private adminService: AdminService,
    private adminPanelService: AdminControllerService,
  ) {
  }

  get mangaPageCover(): string | undefined {
    if(this._manga.mangaCover) {
      return 'data:image/jpg;base64, ' + this._manga.mangaCover;
    }
    return 'https://sun1-98.userapi.com/s/v1/ig2/LfnoBVxZojzcr9YVqswNnZXMXj630tCPHJUdi94oKLPCrAyybhv-2c0M9in5Pxqq0Rli1dkZVNJlMc3ySF5pLGey.jpg?size=1800x1800&quality=95&crop=0,0,1800,1800&ava=1';
  }


  ngOnInit(): void {
    this.adminService.checkToAdmin();

    this.pageId = this.activatedRoute.snapshot.params['mangaPageId'];
    this.loadMangaPage();




  }


  loadMangaPage() {
    this.pageError = '';
    this.mangaService.findMangaByPageId({
      mangaPageId: this.pageId
    }).subscribe({
      next: (res) => {
        this._manga = res;
        this.findAllUnverifiedChap();
      },
      error: (err) => {
        this.pageError = "Sorry, page not found. Check url for correct data"
      }
    });
  }

  findAllUnverifiedChap() {
    this.chaptersError = '';
    this.adminPanelService.findUnverifiedChaptersByMangaId({
      mangaId: this._manga.id as number
    }).subscribe({
      next: (chapters) => {
        this._chaptersByManga = chapters;
      },
      error: (err) => {
        this.chaptersError = "Sorry, chapters not found!"
      }
    });
  }


}
