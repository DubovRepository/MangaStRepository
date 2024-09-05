import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {TokenService} from "../../servicesT/token/token.service";
import {RegisterRequest} from "../../services/models/register-request";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrl: './test-registration.component.scss'
})
export class TestRegistrationComponent implements OnInit{


  registerRequest: RegisterRequest = {email: '', nickname: '', password: '', confirmPassword: ''};
  errorMsg: Array<string> = [];
  message: string = '';
  validCode = '';
  enterCode = '';
  isAvailable = false;



  constructor(
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService
  ) {
  }

  testReg() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: (res) => {
        this.isAvailable = true;
        this.validCode = res.code as string;
      },
      error: (err) => {
        if(err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error)
        }
      }
    });
  }

  activateAccount() {
    this.errorMsg = [];
    if (this.enterCode == this.validCode) {
      this.authService.confirm({
        body: this.registerRequest
      }).subscribe({
        next: (res) => {
          this.tokenService.token = res.accessToken as string;
          this.router.navigate(['manga']);
        }
        }
      )
    } else {
      this.errorMsg.push("Incorrect code! New code sending on your email!");
      this.authService.register({
        body: this.registerRequest
      }).subscribe({
        next: (res) => {
          this.validCode = res.code as string;
          this.isAvailable = true;
        }
      })
    }
  }



  backToRegister() {
    this.isAvailable = false;
  }

  ngOnInit(): void {
    const valid = !this.tokenService.isTokenNotValid()
    if(valid) {
      this.router.navigate(['']);
    }
  }
}
