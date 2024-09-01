import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../../../servicesT/token/token.service";

import {AdminService} from "../../../../servicesT/admin/admin.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {PageResponseMangaResponse} from "../../../../services/models/page-response-manga-response";
import {MangaResponse} from "../../../../services/models/manga-response";


@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrl: './manga-list.component.scss'
})
export class MangaListComponent implements OnInit{
  mangaResponse: PageResponseMangaResponse = {};
  page = 0;
  size = 14;
  message = '';
  searchParam = '';
  title = '';
  isError = false;
  categoriesList: Array<string> = [];
  categoriesMap = new Map();
  tmpCheck: boolean = false;
  isAdmin: boolean | undefined;

  constructor(
    private mangaService: MangaControllerService,
    private tokenService: TokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.isAdmin = this.adminService.isAdmin();
    this.loadManga()

  }

  checkIsAdmin() {
    return this.adminService.isAdmin()
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



  public checkCategory(value: string) {

  for (let category of this.categoriesList) {
    this.categoriesMap.set(category, false);
  }
  this.categoriesMap.set(value, this.tmpCheck);


    /*for(let category of this.categories) {
      if(category = value) {

      }
      category = false;
    }
    value = true; */

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
    this.router.navigate([''], {
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

  toMangaInfo(manga: MangaResponse) {
    this.router.navigate([`mangaPage/${manga.mangaPageId}`])
  }
}
