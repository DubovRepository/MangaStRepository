import { Component } from '@angular/core';
import {LogoutService} from "../../../../servicesT/logout/logout.service";
import {AuthenticationControllerService} from "../../../../services/services/authentication-controller.service";
import {TokenService} from "../../../../servicesT/token/token.service";

@Component({
  selector: 'app-menu-book',
  templateUrl: './menu-book.component.html',
  styleUrl: './menu-book.component.scss'
})
export class MenuBookComponent {

  constructor(
    private logoutService: LogoutService,

  ) {
  }


  logout() {
    this.logoutService.logout();
    //this.authService.logout({body: this.localStorage.getItem('token') as string})
    localStorage.clear();
  }

  protected readonly localStorage = localStorage;
}
