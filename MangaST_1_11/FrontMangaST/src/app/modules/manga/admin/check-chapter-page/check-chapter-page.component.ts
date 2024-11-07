import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../../servicesT/admin/admin.service";
import {AdminControllerService} from "../../../../services/services/admin-controller.service";
import {ChapterControllerService} from "../../../../services/services/chapter-controller.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {ChapterResponse} from "../../../../services/models/chapter-response";
import {MangaResponse} from "../../../../services/models/manga-response";

@Component({
  selector: 'app-check-chapter-page',
  templateUrl: './check-chapter-page.component.html',
  styleUrl: './check-chapter-page.component.scss'
})
export class CheckChapterPageComponent implements OnInit{

  isChecked = false;
  currentChapter: ChapterResponse = {};
  pageId = '';
  chapterId: number | undefined;
  chapterNumber: number | undefined;
  private _selectedFile: undefined | string;
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

    if(this.activatedRoute.snapshot.params['mangaPageId']) {
      this.pageId = this.activatedRoute.snapshot.params['mangaPageId'];
      this.errorMsg = '';

      if (this.activatedRoute.snapshot.params['chapterId']) {
        this.chapterId = this.activatedRoute.snapshot.params['chapterId'];
        this.adminService.checkToAdmin(); //Проверка на админа
        this.isChecked = true;

        //Загрузка главы для проверки администрацией
        this.loadCheckedChapter();
      }
    }

  }

  get selectedFile(): string | undefined {
    if(this.currentChapter.content) {
      return 'data:application/pdf;base64, ' + this.currentChapter.content;
    }
    return './../../assets/pdf/test.pdf';
  }


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

  denyRequest() {
    this.errorMsg = '';
    this.adminPanelService.deleteUntrustedChapter({
      chapterId: this.currentChapter.id as number
    }).subscribe({
      next: () => {
        this.router.navigate([`admin-panel/check-requests/${this.pageId}`]);
      },
      error: (err) => {
        this.errorMsg = 'Sorry, the some error has occurred!'
      }
    })
  }

  acceptRequest() {
    this.errorMsg = '';
    this.adminPanelService.setTrustChapter({

      chapterId: this.currentChapter.id as number
    }).subscribe({
      next: () => {
        this.router.navigate([`admin-panel/check-requests/${this.pageId}`]);
      },
      error: (err) => {
        this.errorMsg = 'Sorry, the some error has occurred!'
      }
    })
  }

  toBack() {
    this.router.navigate([`admin-panel/check-requests/${this.pageId}`]);
  }
}
