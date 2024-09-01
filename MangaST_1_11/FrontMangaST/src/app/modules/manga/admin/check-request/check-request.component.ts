import {Component, OnInit} from '@angular/core';

import {TokenService} from "../../../../servicesT/token/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../../servicesT/admin/admin.service";
import {PageResponseMangaResponse} from "../../../../services/models/page-response-manga-response";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {AdminControllerService} from "../../../../services/services/admin-controller.service";
import {MangaResponse} from "../../../../services/models/manga-response";


@Component({
  selector: 'app-check-request',
  templateUrl: './check-request.component.html',
  styleUrl: './check-request.component.scss'
})
export class CheckRequestComponent implements OnInit {
  mangaResponse: PageResponseMangaResponse = {};
  page = 0;
  size = 14;
  message = '';
  searchParam = '';
  title = '';
  isError = false;

  constructor(
    private mangaService: MangaControllerService,
    private tokenService: TokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private adminPanelService: AdminControllerService,

  ) {
  }

  ngOnInit(): void {
    this.adminService.checkToAdmin()
    this.loadManga()

  }



  private loadManga() {
    if(this.activatedRoute.snapshot.queryParams['search']) {
      //
      this.title = '';
      //
      this.title = this.activatedRoute.snapshot.queryParams['search'];
      if(this.title == '') {
        this.findAllMangaWithUnverifiedChapters();
      } else {
        this.findAllMangaByTitleWithUnverifiedChapters();
      }
    } else {
      this.findAllMangaWithUnverifiedChapters();
    }
  }



  private findAllMangaWithUnverifiedChapters() {
    //this.title = '';
    this.isError = false;
    //this.tokenService.isTokenNotValid();
    this.adminPanelService.findAllMangaWithUnverifiedChapters({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (mangaList) => {
        this.mangaResponse = mangaList;
      },
      error: (err) => {
        this.isError = true;
        //this.router.navigate(['login']);
      }
    });
  }

  private findAllMangaByTitleWithUnverifiedChapters() {
    //this.title = '';
    //this.title = this.activatedRoute.snapshot.queryParams['search'];
    //this.title = this.searchParam;
    this.isError = false;
    //this.tokenService.isTokenNotValid(); //???
    this.adminPanelService.findMangaWithUnvChaptersByTitle({
      mangaTitle: this.title,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (manga) => {
        this.mangaResponse = manga;
      },
      error: (err) => {
        this.message = 'Wow, wtf!'
        this.isError = true;
      }
    });
  }

  toUnverifiedChapters(manga: MangaResponse) {
    this.router.navigate([`admin-panel/check-requests/${manga.mangaPageId}`]);
  }


  public toSearch() {
    this.page = 0;
    this.isError = false;
    this.message = '';
    this.router.navigate(['admin-panel/check-requests'], {
      queryParams: { search: this.searchParam }
    });

    this.title = this.searchParam;
    if(this.title == '') {
      this.adminPanelService.findAllMangaWithUnverifiedChapters({
        page: this.page,
        size: this.size
      }).subscribe({
        next: (mangaList) => {
          this.mangaResponse = mangaList;
        }
      })
    } else {
      this.findAllMangaByTitleWithUnverifiedChapters();
    }
  }


  gotToFirstPage() {
    this.page = 0;
    //this.findAllMangaWithUnverifiedChapters();
    this.loadManga();
  }

  gotToPreviousPage() {
    this.page--;
    //this.findAllMangaWithUnverifiedChapters();
    this.loadManga();
  }

  gotToPage(pageIndex: number) {
    this.page = pageIndex;
    //this.findAllMangaWithUnverifiedChapters();
    this.loadManga();
  }

  gotToNextPage() {
    this.page++;
    //this.findAllMangaWithUnverifiedChapters();
    this.loadManga();
  }

  gotToLastPage() {
    this.page = this.mangaResponse.totalPages as number - 1;
    //this.findAllMangaWithUnverifiedChapters();
    this.loadManga();
  }

  get isLastPage(): boolean {
    return this.page == this.mangaResponse.totalPages as number - 1;
  }

  toCheckManga(manga: MangaResponse) {
    this.router.navigate([`mangaPage/${manga.mangaPageId}`])
  }

}
