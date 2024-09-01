import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserControllerService} from "../../../../services/services/user-controller.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";
import {PageResponseMangaResponse} from "../../../../services/models/page-response-manga-response";
import {UserResponse} from "../../../../services/models/user-response";
import {MangaResponse} from "../../../../services/models/manga-response";



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{

  userInfo: UserResponse = {};
  pageResponse: PageResponseMangaResponse = {};
  page = 0;
  size = 5;
  message = '';
  private _userCover: string | undefined;
  securityEmail = '';
  selectedUserCover: any;



  constructor(
    private router: Router,
    private userService: UserControllerService,
    private mangaService: MangaControllerService,
  ) {
  }



  ngOnInit(): void {
    this.findAllByUser();
  }


  private findFavoriteManga() {
    this.message = '';
    this.userService.findUserFavoriteList({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (mangaList) => {
        this.pageResponse = mangaList;
      },
      error: (err) => {
        this.message = 'Sorry, but nothing not found!'
      }
    });
  }

  private findAllByUser() {
    this.userService.infoByUser().subscribe({
      next: (user) => {
        this.userInfo = user;
        let tmpEmail = this.userInfo.email;
        const n = tmpEmail?.split("").length as number
        for(let i = 0; i < n; i++) {
          if(i == 0 || i == 1 || i == n-1) {
            this.securityEmail += tmpEmail?.charAt(i);
          } else {
            this.securityEmail += "*";
          }
        }

      },
      error: (err) => {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    });
    this.findFavoriteManga();
  }

  changeAccountPicture(event: any) {
    this.selectedUserCover = event.target.files[0];
    console.log(this.selectedUserCover);

    if(this.selectedUserCover) {
      this.userService.loadNewProfileCover({
        body: {
          file: this.selectedUserCover
        }
      }).subscribe({
        next: () => {

        },
        error: (err) => {

        }
      });
      const reader = new FileReader();
      reader.onload = () => {
        this._userCover = reader.result as string;
      }
      reader.readAsDataURL(this.selectedUserCover);
    }

  }


  get userCover(): string | undefined {
    if(this.selectedUserCover) {
      return this._userCover;
    }
    else if (this.userInfo.userCover) {
      return 'data:image/jpg;base64, ' + this.userInfo.userCover;
    }
    return 'https://sun1-98.userapi.com/s/v1/ig2/LfnoBVxZojzcr9YVqswNnZXMXj630tCPHJUdi94oKLPCrAyybhv-2c0M9in5Pxqq0Rli1dkZVNJlMc3ySF5pLGey.jpg?size=1800x1800&quality=95&crop=0,0,1800,1800&ava=1';
  }

  gotToFirstPage() {
    this.page = 0;
    this.findFavoriteManga();
  }

  gotToPreviousPage() {
    this.page--;
    this.findFavoriteManga();
  }

  gotToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findFavoriteManga();
  }

  gotToNextPage() {
    this.page++;
    this.findFavoriteManga();
  }

  gotToLastPage() {
    this.page = this.pageResponse.totalPages as number - 1;
    this.findFavoriteManga();
  }

  get isLastPage(): boolean {
    return this.page == this.pageResponse.totalPages as number - 1;
  }


  deleteMangaFromFavorite(manga: MangaResponse) {
    this.message = '';
    this.mangaService.deleteFromFavorite({
      "manga-id": manga.id as number
    }).subscribe({
      next: () => {
        this.message = 'Manga successfully deleted from your favorite list!'
        this.findFavoriteManga();
      }
    })
  }


  toCheckManga(manga: MangaResponse) {
    this.router.navigate([`mangaPage/${manga.mangaPageId}`])
  }

}
