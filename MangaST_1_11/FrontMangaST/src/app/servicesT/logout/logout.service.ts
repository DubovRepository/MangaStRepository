import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private baseUrl = 'http://localhost:8082/mangaSt/logout';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  logout() {
    this.http.get(this.baseUrl);
  }

}
