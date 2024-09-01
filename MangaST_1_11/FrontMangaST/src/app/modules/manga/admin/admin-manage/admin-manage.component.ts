import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../servicesT/admin/admin.service";

import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../../../services/services/categories.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {MangaResponse} from "../../../../services/models/manga-response";
import {UpdateMangaRequest} from "../../../../services/models/update-manga-request";
import {MangaRequest} from "../../../../services/models/manga-request";
import {Category} from "../../../../services/models/category";
import {AdminControllerService} from "../../../../services/services/admin-controller.service";



//Объект для рассмотрения заявок на добавление глав (нажал на заявку, открылась инфа об манге и вылазиет список
//ожидаемых добавления/проверки глав и чтоб писало время добавления манг, а если быть точным
//при открытии страницы была бы сортировка по времени добавления
@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrl: './admin-manage.component.scss'
})
export class AdminManageComponent implements OnInit{
  isEdit = false;
  editManga: MangaResponse = {};
  errMsg: Array<string> = [];
  //selectedCategories: Array<Category> = [];
  listStatus: string[] = [];

  mangaUpdateRequest: UpdateMangaRequest = {
    authorName: "",
    categoryList: [],
    description: "",
    id: undefined,
    status: "ANNOUNCE" || "ONGOING" || "PAUSED" || "COMPLETED" || "DISCONTINUED",
    title: "",
    typeManga: "MANGA" || "MANHWA"
  }

  //sendRequest: MangaRequest =  <MangaRequest>{};


  mangaRequest: MangaRequest = {
    authorName: "",
    status: "ANNOUNCE" || "ONGOING" || "PAUSED" || "COMPLETED" || "DISCONTINUED",
    description: "",
    mangaCategories: [],
    title: "",
    typeManga: "MANGA" || "MANHWA"
  }
  testList = ["ANNOUNCE","ONGOING","PAUSED","COMPLETED","DISCONTINUED"];
  listTypesManga = ["MANGA", "MANHWA"];
  listOfAllCategories: Array<Category> = [];


  selectedMangaCover: any;
  selectedPicture: string | undefined;

  constructor(
    private adminService: AdminService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private mangaService: MangaControllerService,
    private adminPanelService: AdminControllerService,
    private router: Router,
  ) {
  }



  ngOnInit(): void {
    this.loadToStandart();
    this.loadCategories();
    this.loadListStatus();

    this.adminService.checkToAdmin();


    if(this.activatedRoute.snapshot.params['mangaPageId']) {
      this.loadEditManga();
    }

  }

  //Для editManga
  updateManga() {
    this.mangaUpdateRequest.id = this.editManga.id;
    this.mangaUpdateRequest.typeManga = this.mangaRequest.typeManga;
    this.mangaUpdateRequest.title = this.mangaRequest.title;
    this.mangaUpdateRequest.authorName = this.mangaRequest.authorName;
    this.mangaUpdateRequest.status = this.mangaRequest.status;
    this.mangaUpdateRequest.description = this.mangaRequest.description;
    this.mangaUpdateRequest.categoryList = this.mangaRequest.mangaCategories;
    //Присваеваем editManga все значения mangaRequest и уже отправляем editManga на сервер
    this.adminPanelService.updateManga({
      body: this.mangaUpdateRequest
    }).subscribe({
      next: (mangaId) => {
        if(this.selectedMangaCover) {
          this.adminPanelService.loadCover({
            mangaId: mangaId,
            body: {
              file: this.selectedMangaCover
            }
          }).subscribe({
            next: () => {
              this.router.navigate(['admin-panel']);
            }
          });
        } else {
          this.router.navigate(['admin-panel']);
        }
      },
      error: (err) => {
        if(err.error.validationErrors) {
          this.errMsg = err.error.validationErrors;
        } else {
          this.errMsg.push(err.error.error)
        }
      }
    });
  }

  //Для mangaRequest!
  createManga() {
    if(this.selectedMangaCover) {
    this.adminPanelService.addManga({
      body: this.mangaRequest
    }).subscribe({
      next: (mangaId) => {
        this.adminPanelService.loadCover({
          mangaId: mangaId,
          body: {
            file: this.selectedMangaCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate([''])
          }
        })
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errMsg = err.error.validationErrors;
        } else {
          this.errMsg.push(err.error.error)
        }
      }
    });
  } else {
      throw new Error("Select a picture!");
    }
  }


  loadToStandart() {
    this.errMsg = [];
    this.editManga = {};
    this.isEdit = false;
  }

  loadCategories() {
    this.errMsg = [];

    this.categoriesService.findAllMangaCategories().subscribe({
      next: (categories) => {
        this.listOfAllCategories = categories;
      },
      error: (err) => {
        this.errMsg.push(err);
      }
    });
  }

  loadListStatus() {
    this.mangaService.findAllStatus().subscribe({
      next: (list) => {
        this.listStatus = list;
      },
      error: (err) => {
        this.errMsg.push("Error to load manga status!");
      }
    })
  }


  onFileSelected(event: any) {
    this.selectedMangaCover = event.target.files[0]; //file[0] обозначает, что только один файл
    console.log(this.selectedMangaCover);
    if(this.selectedMangaCover) {
      const  reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedMangaCover);

    }
  }

  loadEditManga() {
    this.isEdit = true;
    var tmp_variable = this.activatedRoute.snapshot.params['mangaPageId'];
    //todo onload manga by id from editManga;
    this.mangaService.findMangaByPageId({mangaPageId:tmp_variable}).subscribe({
      next: (manga) => {

        this.editManga = manga;
        this.mangaRequest.title = this.editManga.title as string;
        this.mangaRequest.authorName = this.editManga.authorName as string;
        this.mangaRequest.description = this.editManga.description as string;
        //this.mangaRequest.mangaCategories = this.editManga. as string;
        this.mangaRequest.typeManga = this.editManga.typeManga;
        this.mangaRequest.status = this.editManga.status;
        this.mangaRequest.title = this.editManga.title as string;
        //????=======================================================================
        if(this.editManga.mangaCover) {
          this.selectedPicture = 'data:image/jpg;base64,' + this.editManga.mangaCover;
        }


        this.loadEditMangaCategories();
      },
      error: (err) => {
        this.errMsg.push("Manga with this id not exists!")
      }
    });

    //Затем как только загрузились мы присваеваем mangaRequest необходимые переменные из editManga
    //Все это лучше вынести в отдельный метод после if
  }

  loadEditMangaCategories() {
    //Загружаем список определенных категорий от манг
    this.categoriesService.findCategoriesByMangaId({ mangaId: this.editManga.id as number}).subscribe({
      next: (categories) => {
        this.mangaRequest.mangaCategories = categories;

        categories.forEach((category) => {
          let linkRef = `.${category.category}_btn`;
          let link = document.querySelector(linkRef);
          if(typeof(link) != 'undefined' && link != null) {
            link.classList.add('active');
          }
        });
      },
      error: (err) => {
        this.errMsg.push("Error to upload categories by defined");
      }
    });

    //Присваиваем их в mangaRequest.categories
    //После чего делаем цикл и перебираем категории добавляя в классы схожие с их именнами .active
  }


  clickToButton(category: Category) {
    const linkTest = `.${category.category}_btn`;
    console.log(linkTest);
    let link = document.querySelector(linkTest);

    if(typeof(link) != 'undefined' && link != null) {
      if (link.classList.contains('active')) {
        link.classList.remove('active');
        for(let i = 0; i < this.mangaRequest.mangaCategories.length; i++) {
          if (this.mangaRequest.mangaCategories[i].id === category.id
            && this.mangaRequest.mangaCategories[i].category === category.category) {
            this.mangaRequest.mangaCategories.splice(i, 1);
          }
        }
      } else {
        link.classList.add('active')
        this.mangaRequest.mangaCategories.push(category);
      }
    }


    console.log(link);
  }
}
