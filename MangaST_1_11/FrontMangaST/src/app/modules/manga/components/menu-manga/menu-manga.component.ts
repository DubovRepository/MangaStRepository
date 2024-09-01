import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../../servicesT/token/token.service";
import {Router} from "@angular/router";
import {UserControllerService} from "../../../../services/services/user-controller.service";
import {MangaControllerService} from "../../../../services/services/manga-controller.service";




@Component({
  selector: 'app-menu-manga',
  templateUrl: './menu-manga.component.html',
  styleUrl: './menu-manga.component.scss'
})
export class MenuMangaComponent implements OnInit{

  isAuthenticated = false;
  isAdmin = false;
  searchPrm = '';
  nickname = '';


  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: UserControllerService,
    private mangaService: MangaControllerService
  ) {
  }

  toSearch() {
    this.router.navigate([''], {
      queryParams: { search: this.searchPrm }
    });
    //window.location.reload();

  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  ngOnInit(): void {
    this.nickname = '';
    //this.tokenService.isTokenNotValid();
    if(this.tokenService.token) {
      this.isAuthenticated = true;
      this.checkToAdmin();
    } else {
      this.isAuthenticated = false;
    }

    this.checkLinkColor();
  }

  private checkLinkColor() {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if(window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  checkToAdmin() {
    this.userService.isAdmin().subscribe({
      next: (res) => {
        this.isAdmin = res;
      }
    })
  }

  toLogin() {
    this.router.navigate(['login'])
  }

  toAccount() {
    this.router.navigate(['manga/account'])
  }
}
