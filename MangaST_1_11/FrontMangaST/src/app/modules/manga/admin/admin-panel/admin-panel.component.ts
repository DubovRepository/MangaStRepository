import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../../servicesT/admin/admin.service";

import {TokenService} from "../../../../servicesT/token/token.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {PageResponseMangaResponse} from "../../../../services/models/page-response-manga-response";
import {AdminControllerService} from "../../../../services/services/admin-controller.service";
import {MangaResponse} from "../../../../services/models/manga-response";




@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit{

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

  deleteManga(manga: MangaResponse) {
    this.adminPanelService.deleteMangaById({
      "manga-id": manga.id as number
    }).subscribe({
      next: () => {
        this.loadManga();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editManga(manga: MangaResponse) {
    this.router.navigate([`admin-panel/manage/${manga.mangaPageId}`])
  }


  toAddManga() {
    this.router.navigate(['admin-panel/manage']);
  }

  toCheckRequests() {
    this.router.navigate(['admin-panel/check-requests']);
  }

  private loadManga() {
    if(this.activatedRoute.snapshot.queryParams['search']) {
      //
      this.title = '';
      //
      this.title = this.activatedRoute.snapshot.queryParams['search'];
      if(this.title == '') {
        this.findAllManga();
      } else {
        this.findAllMangaByTitle();
      }
    } else {
      this.findAllManga();
    }
  }



  private findAllManga() {
    //this.title = '';
    this.isError = false;
    this.tokenService.isTokenNotValid();
    this.mangaService.findAllManga({
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

  private findAllMangaByTitle() {
    //this.title = '';
    //this.title = this.activatedRoute.snapshot.queryParams['search'];
    //this.title = this.searchParam;
    this.isError = false;
    //this.tokenService.isTokenNotValid(); //???
    this.mangaService.findByTitle({
      title: this.title,
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


  public toSearch() {
    this.page = 0;
    this.isError = false;
    this.message = '';
    this.router.navigate(['admin-panel'], {
      queryParams: { search: this.searchParam }
    });

    this.title = this.searchParam;
    if(this.title == '') {
      this.mangaService.findAllManga({
        page: this.page,
        size: this.size
      }).subscribe({
        next: (mangaList) => {
          this.mangaResponse = mangaList;
        }
      })
    } else {
      this.findAllMangaByTitle();
    }
  }


  gotToFirstPage() {
    this.page = 0;
    //this.findAllManga();
    this.loadManga();
  }

  gotToPreviousPage() {
    this.page--;
    //this.findAllManga();
    this.loadManga();
  }

  gotToPage(pageIndex: number) {
    this.page = pageIndex;
    //this.findAllManga();
    this.loadManga();
  }

  gotToNextPage() {
    this.page++;
    //this.findAllManga();
    this.loadManga();
  }

  gotToLastPage() {
    this.page = this.mangaResponse.totalPages as number - 1;
    //this.findAllManga();
    this.loadManga();
  }

  get isLastPage(): boolean {
    return this.page == this.mangaResponse.totalPages as number - 1;
  }

  toCheckManga(manga: MangaResponse) {
    this.router.navigate([`mangaPage/${manga.mangaPageId}`])
  }

}
