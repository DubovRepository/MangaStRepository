import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {TokenService} from "../../../../servicesT/token/token.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {ChapterControllerService} from "../../../../services/services/chapter-controller.service";
import {MangaResponse} from "../../../../services/models/manga-response";
import {ChapterResponse} from "../../../../services/models/chapter-response";
import {ChaptersRequest} from "../../../../services/models/chapters-request";
import {RatingRequest} from "../../../../services/models/rating-request";
import {RatingControllerService} from "../../../../services/services/rating-controller.service";
import {CommentControllerService} from "../../../../services/services/comment-controller.service";
import {CommentRequest} from "../../../../services/models/comment-request";



@Component({
  selector: 'app-manga-page',
  templateUrl: './manga-page.component.html',
  styleUrl: './manga-page.component.scss'
})
export class MangaPageComponent implements OnInit{

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
  ratingRequest: RatingRequest = {};
  appreciateError = '';
  ourComment = '';
  commentErrors: Array<string> = [];

  constructor(
    private mangaService: MangaControllerService,
    private activatedRoute: ActivatedRoute,
    private chapterService: ChapterControllerService,
    private tokenService: TokenService,
    private router: Router,
    private ratingService: RatingControllerService,
    private commentService: CommentControllerService,
  ) {
  }

  chapterRequest: ChaptersRequest = {chapterTitle: "", mangaId: undefined, numberChapter: undefined}; //в ChapterRequest добавить undefined
  isAdd = false;
  selectedPdfFile: any;
  commentRequest: CommentRequest = {};

  get mangaPageCover(): string | undefined {
    if(this._manga.mangaCover) {
      return 'data:image/jpg;base64, ' + this._manga.mangaCover;
    }
    return 'https://sun1-98.userapi.com/s/v1/ig2/LfnoBVxZojzcr9YVqswNnZXMXj630tCPHJUdi94oKLPCrAyybhv-2c0M9in5Pxqq0Rli1dkZVNJlMc3ySF5pLGey.jpg?size=1800x1800&quality=95&crop=0,0,1800,1800&ava=1';
  }


  ngOnInit(): void {
    this.errorMsg = '';
    if(this.tokenService.token) {
      this.isAuthorization = true;
    }

    if(this.activatedRoute.snapshot.params['mangaPageId']) {
      this.isAdd = false;
      this.pageId = this.activatedRoute.snapshot.params['mangaPageId'];
      this.loadMangaPage();


      this.sectionParam = this.activatedRoute.snapshot.queryParams['section'];
      if (!(this.sectionParam == 'chapters' || this.sectionParam == 'info')) {
        this.router.navigate(['mangaPage/' + this.pageId], {
          queryParams: {section: 'info'}
        });
      }

      if (this.sectionParam == 'chapters') {
        this.isChapters = true;
      } else {
        this.isChapters = false;
      }
    } else if (this.activatedRoute.snapshot.params['pageId']) {
      this.isAdd = true;
      if(!this.tokenService.token) {
        this.router.navigate(['login'])
      }

      this.pageId = this.activatedRoute.snapshot.params['pageId'];
      this.loadMangaPage();


    }

  }


  loadMangaPage() {
    this.pageError = '';
    this.ourComment = '';
    this.commentErrors = [];
    this.mangaService.findMangaByPageId({
      mangaPageId: this.pageId
    }).subscribe({
      next: (res) => {
        this._manga = res;
        this.findAllChap();
      },
      error: (err) => {
        this.pageError = "Sorry, page not found. Check url for correct data"
      }
    });
  }

  onSelectedPdfFile(event: any) {
    this.selectedPdfFile = event.target.files[0];
    console.log(this.selectedPdfFile);

  }

  addChapterRequest() {
    if(this.selectedPdfFile) {
      this.chapterRequest.mangaId = this._manga.id as number;
      this.chapterService.addChap({
        body: this.chapterRequest
      }).subscribe({
        next: (chapId) => {
          this.chapterService.loadPdfChap({
            body: {
              file: this.selectedPdfFile
            },
            chapterId: chapId as number,
            mangaId: this.chapterRequest.mangaId as number
          }).subscribe({
            next: () => {
              this.router.navigate([`/mangaPage/${this._manga.mangaPageId}`]);
              console.log("Successfully added a new chapter");
            },
            error: (err) => {
              this.errorMsg = 'Error to load pdf file';
            }
          })
        },
        error: (err) => {
          this.errorMsg = 'Some error to add manga'
        }
      });
    } else {
      throw new Error("File is null!");
      this.errorMsg = 'File is null!';
    }
  }


  findAllChap() {
    this.chaptersError = '';
    this.chapterService.findAllChaptersByMangaId({
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


  addToAchieved() {
    this.errorMsg = '';

    //todo add to FavoriteList
    this.mangaService.addToFavorite({
      "manga-id": this._manga.id as number
    }).subscribe({
      error: (err) => {
        this.errorMsg = 'Some error to add manga';
      }
    })
    this._manga.achieved = true;
  }

  deleteFromAchieved() {
    this.errorMsg = '';
    this._manga.achieved = false;

    this.mangaService.deleteFromFavorite({
      "manga-id": this._manga.id as number
    }).subscribe({
      error: (err) => {
        this.errorMsg = 'Some error to delete manga'
      }
    })
    //delete from FavoriteList

  }

  addChapter() {
    this.router.navigate([`mangaPage/${this.pageId}/add`]);
  }

  toAppreciate() {
   if(!this.tokenService.token) {
     this.router.navigate(['login']);
   }

   const appreciateWindow = document.getElementById('appreciate-container');
   if(typeof(appreciateWindow) != 'undefined' && appreciateWindow != null) {
     appreciateWindow.style.display = "block"
   }
   const background =  document.getElementById('overall-container');
    if(typeof(background) != 'undefined' && background != null) {
      background.style.pointerEvents = "none";
    }
  }

  backToMainPage() {
    const appreciateWindow = document.getElementById('appreciate-container');
    if(typeof(appreciateWindow) != 'undefined' && appreciateWindow != null) {
      appreciateWindow.style.display = "none"
    }
    const background =  document.getElementById('overall-container');
    if(typeof(background) != 'undefined' && background != null) {
      background.style.pointerEvents = "auto";
    }
  }

  writeComment() {
    if(!this.tokenService.token) {
      this.router.navigate(['login']);
    }

    this.commentRequest.mangaId = this._manga.id;
    this.commentRequest.content = this.ourComment;
    this.commentService.addComment({
      body: this.commentRequest
    }).subscribe({
      next: () => {
        this.errorMsg = '';
        window.location.reload();
      },
      error: (err) => {
        if(err.error.validationErrors) {
          this.commentErrors = err.error.validationErrors;
          throw new Error(err.error.validationErrors);
        } else {
          this.commentErrors.push(err.error.error);
        }

      }
    })
  }


  appreciateManga(rating: number) {
    this.appreciateError = '';
    if(rating == null) {
      throw new Error("Choose a rate!");
      this.appreciateError = 'Please choose a rating!';
    } else {
      this.ratingRequest.mangaId = this._manga.id;
      this.ratingRequest.userRate = rating;
      this.ratingService.rateManga({body: this.ratingRequest}).subscribe({
        next: () => {
          const appreciateWindow = document.getElementById('appreciate-container');
          if (typeof (appreciateWindow) != 'undefined' && appreciateWindow != null) {
            appreciateWindow.style.display = "none"
          }
          const background =  document.getElementById('overall-container');
          if(typeof(background) != 'undefined' && background != null) {
            background.style.pointerEvents = "auto";
          }
          window.location.reload();
        },
        error: (err) => {
          this.appreciateError = err.error.error;
        }
      });
    }
  }


}
