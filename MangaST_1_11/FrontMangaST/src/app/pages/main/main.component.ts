import {Component, OnInit} from '@angular/core';
import {LogoutService} from "../../servicesT/logout/logout.service";

import {TokenService} from "../../servicesT/token/token.service";




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  constructor(
    private logoutService: LogoutService,
    private tokenService: TokenService
  ) {
  }


  logout() {
    this.logoutService.logout();
    //this.authService.logout({body: this.localStorage.getItem('token') as string})
    localStorage.clear();
  }

  protected readonly localStorage = localStorage;

  ngOnInit(): void {
    this.tokenService.isTokenNotValid();
  }
}
