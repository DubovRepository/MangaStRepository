import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfoResponse} from "../../services/models/user-info-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8082/mangaSt'
  constructor(
    private httpClient: HttpClient
  ) { }

  loadAccountInfo(token: string)  {
    return this.httpClient.get<UserInfoResponse>(`${this.baseUrl}/profile/${token}`);
  }

}
