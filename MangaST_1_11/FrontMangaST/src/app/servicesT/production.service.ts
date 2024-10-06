import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  private baseUrl = 'http://localhost:8082/mangaSt/catalog';


  constructor(
    private http: HttpClient
  ) { }

  /*
  findAllProductions() : Observable<Product[]> {
   return this.http.get<Product[]>(this.baseUrl)
  }

  findByPathTitle(pathTitle: string) {
    return this.http.get<Product>(`${this.baseUrl}/${pathTitle}`)
  }


  findChaptersByPathTitle(pathTitle: string) {
    return this.http.get<Chapter[]>(`${this.baseUrl}/chaptersT/${pathTitle}`)
  }

  findChaptersByProdId(id: number) {
    return this.http.get<Chapter[]>(`${this.baseUrl}/chapters/${id}`);
  }
   */
}
