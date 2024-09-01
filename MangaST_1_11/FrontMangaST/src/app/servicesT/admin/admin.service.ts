import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {UserControllerService} from "../../services/services/user-controller.service";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private router: Router,
    private userService: UserControllerService
  ) { }


  checkToAdmin() {
    this.userService.isAdmin().subscribe({
      next: (res) => {
        if(res == false) {
          this.router.navigate(['']);
        }
      }
    });
  }

  isAdmin(){
    var result = false;
    this.userService.isAdmin().subscribe({
      next: (res) => {
        result = res as boolean;
      }
    });
    return result;
  }


}
