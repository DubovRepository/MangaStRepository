import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {TokenService} from "../../servicesT/token/token.service";
import {ForgotPasswordRequest} from "../../services/models/forgot-password-request";
import {NewPasswordRequest} from "../../services/models/new-password-request";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  isAvailable = true;
  isAvailableVerify = false;
  isAvailableNewPassword = false;
  errorMsg: Array<string> = [];
  forgotPasswordRequest: ForgotPasswordRequest = {email: ''};
  newPasswordRequest: NewPasswordRequest = {email: '', newPassword: '', confirmNewPassword: ''};
  validCode: string = '';
  enterCode: string = '';

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

  sendRecoveryCode() {
    this.errorMsg = [];
    this.authService.check({
      body: this.forgotPasswordRequest
    }).subscribe({
      next: (res) => {
        this.isAvailable = false;
        this.isAvailableVerify = true;
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

  recoverCodeAccount() {
    this.errorMsg = [];
    if(this.enterCode == this.validCode) {
      this.isAvailableVerify = false;
      this.isAvailableNewPassword = true;
    } else {
      this.errorMsg.push("Incorrect recovery code. \nNew code sending for your email!")
      this.authService.check({
        body: this.forgotPasswordRequest
      }).subscribe({
        next: (res) => {
          this.validCode = res as string;
        }
      })
    }
  }

  setNewPassword() {
    this.errorMsg = [];
    this.newPasswordRequest.email = this.forgotPasswordRequest.email;
    this.authService.recoverAccount({
      body: this.newPasswordRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.accessToken as string;
        this.router.navigate(['main']);
      },
      error: (err) => {
        if(err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error)
        }
      }
    })
  }
}
