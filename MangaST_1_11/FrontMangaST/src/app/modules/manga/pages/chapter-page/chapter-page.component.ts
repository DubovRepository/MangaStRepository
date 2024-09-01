import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../../servicesT/admin/admin.service";
import {ChapterControllerService} from "../../../../services/services/chapter-controller.service";
import {ChapterResponse} from "../../../../services/models/chapter-response";
import {AdminControllerService} from "../../../../services/services/admin-controller.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {MangaResponse} from "../../../../services/models/manga-response";

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter-page.component.html',
  styleUrl: './chapter-page.component.scss'
})
export class ChapterPageComponent implements OnInit{
  isChecked = false;
  currentChapter: ChapterResponse = {};
  pageId = '';
  chapterId: number | undefined;
  chapterNumber: number | undefined;
  private _selectedFile: undefined | string;
  listAllChapters: Array<ChapterResponse> = [];
  manga: MangaResponse = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private adminPanelService: AdminControllerService,
    private chapterService: ChapterControllerService,
    private mangaService: MangaControllerService,

  ) {}

  errorMsg = '';

  ngOnInit(): void {
    this.pageId = this.activatedRoute.snapshot.params['mangaPageId'];
    this.errorMsg = '';

    if(this.activatedRoute.snapshot.params['chapterId']) {
      this.chapterId = this.activatedRoute.snapshot.params['chapterId'];
      this.adminService.checkToAdmin(); //Проверка на админа
      this.isChecked = true;

      //Загрузка главы для проверки администрацией
      this.loadCheckedChapter();
    } else {
      if(this.activatedRoute.snapshot.params['chapterNumber']) {
        this.chapterNumber = this.activatedRoute.snapshot.params['chapterNumber'] as number;
        this.isChecked = false;

        //Загрузка для просмотра пользователя по определенному маршруту
        this.loadManga();
        this.loadChapter();
      }

    }
  }


  get selectedFile(): string | undefined {
    if(this.currentChapter.content) {
      return 'data:application/pdf;base64, ' + this.currentChapter.content;
    }
    return './../../assets/pdf/test.pdf';
  }


  loadManga() {
    this.errorMsg = '';
    this.mangaService.findMangaByPageId({
      mangaPageId: this.pageId
    }).subscribe({
      next: (responseManga) => {
        this.manga = responseManga;
      },
      error: (err) => {
        this.errorMsg = 'Manga with this page id not found!'
      }
    })
  }

  loadChapter() {
    this.errorMsg = '';
    this.chapterService.findChapterByNumberAndMangaPageId({
      chapterNumber: this.chapterNumber as number,
      pageId: this.pageId
    }).subscribe({
      next: (chapter) => {
        this.currentChapter = chapter;
        this.chapterService.findAllChaptersByPageId({
          pageId: this.pageId
        }).subscribe({
          next: (list) => {
            this.listAllChapters = list;
          },
          error: (err) => {
            this.errorMsg = 'Error to upload list chapters';
          }
        })
      },
      error: (err) => {
        this.errorMsg = 'Sorry but chapter with this number and page id not found';
      }
    })
  }





  //==============================
  //CHECKED


  loadCheckedChapter() {
    this.errorMsg = '';
    this.adminPanelService.findUnverifiedChapterByMangaPageIdAndChapterId({
      chapterId: this.chapterId as number,
      mangaPageId: this.pageId as string
    }).subscribe({
      next: (chapter) => {
        this.currentChapter = chapter;
      },
      error: (err) => {
        this.errorMsg = 'This chapter request not found!';
      }
    });
  }





}
