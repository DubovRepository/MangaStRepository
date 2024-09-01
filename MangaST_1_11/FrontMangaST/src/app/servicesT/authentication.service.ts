import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegRequest} from "../models/reg-request";
import {AuthResponse} from "../models/auth-response";
import {AuthRequest} from "../models/auth-request";
import {RegisterResponse} from "../models/RegisterResponse";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8082/mangaSt/auth';


  constructor(
    private http: HttpClient
  ) { }

  register(
    registerRequest: { body: RegRequest }
  ) {
    return this.http.post<RegisterResponse>
    (`${this.baseUrl}/register`, registerRequest);
  }

  activateAccount(registerRequest: { body: RegRequest }) {
    return this.http.post<AuthResponse>
    (`${this.baseUrl}/activate-account`, registerRequest)
  }

  login(authRequest: AuthRequest) {
    return this.http.post<AuthResponse>
    (`${this.baseUrl}/authenticate`, authRequest);
  }

  authenticate(authRequest: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/authenticate`, authRequest);
  }
}
