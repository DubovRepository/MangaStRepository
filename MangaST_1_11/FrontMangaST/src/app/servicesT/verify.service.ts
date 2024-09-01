import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegRequest} from "../models/reg-request";
import {VerifResponse} from "../models/verif-response";

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private baseUrl = 'http://localhost:8082/mangaSt/verify';

  constructor(private http: HttpClient) {
  }

  testVerifyAccount(registerRequest: RegRequest) {
    return this.http.post<VerifResponse>(`${this.baseUrl}/test`, registerRequest);
  }

  verifyAccount(registerRequest: RegRequest) {
      return this.http.post<string>(this.baseUrl, registerRequest);

  }
}
