import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../servicesT/token/token.service";
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit{
  authRequest: AuthenticationRequest = {email: '', password: '', remember: false};
  errorMsg: Array<string> = [];
  isRemember = false;

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    const valid = !this.tokenService.isTokenNotValid()
    if(valid) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.errorMsg = [];
    this.authRequest.remember = this.isRemember;
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.accessToken as string;
        this.router.navigate(['manga']);
      },
      error: (err) => {
        if(err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    })
  }

  toForgotPassword() {
    this.router.navigate(['forgotPassword']);
  }
}
