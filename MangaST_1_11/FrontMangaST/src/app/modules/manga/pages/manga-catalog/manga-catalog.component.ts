import {Component, OnInit} from '@angular/core';

import {TokenService} from "../../../../servicesT/token/token.service";
import {Router} from "@angular/router";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {PageResponseMangaResponse} from "../../../../services/models/page-response-manga-response";




@Component({
  selector: 'app-manga-catalog',
  templateUrl: './manga-catalog.component.html',
  styleUrl: './manga-catalog.component.scss'
})
export class MangaCatalogComponent implements OnInit{
  mangaResponse: PageResponseMangaResponse = {};
  allCategories: any = [];
  isError = false;
  page = 0;
  size = 5;
  searchCategories: any = 'Adventure';
  errorMsg = "SomeError!"

  //

  categoriesList: Array<string> = [];
  categoriesMap = new Map();
  tmpCheck: boolean = false;
  firstTest: boolean = false;
  secondTest: boolean = false;

  constructor(
    private mangaService: MangaControllerService,
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.loadAllCategories();

    this.isError = false;
    this.mangaService.findAllCategories().subscribe({
      next: (setCategories) => {
        this.allCategories = setCategories;
        this.isError = false;
      },
      error: (err) => {
        this.isError = true;
        this.router.navigate(['login'])
      }
    });


    /*
    this.mangaService.findSortedManga({
      category: this.searchCategories
    }).subscribe({
      next: (res) => {
        this.mangaResponse = res;
      },
      error: (err) => {
        this.isError = true;
        //this.router.navigate(['login'])
      }
    });  */


  }

  private loadAllCategories() {
    this.mangaService.findAllCategories().subscribe({
      next: (setCategories) => {
        this.categoriesList = setCategories;
      }
    });
    for(let category of this.categoriesList) {
      this.categoriesMap.set(category, false);
    }

  }

  public checkCategory(value: boolean) {

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


}
