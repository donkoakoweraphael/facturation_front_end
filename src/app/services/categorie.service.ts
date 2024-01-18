import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get<Array<any>>('http://localhost:8888/categories');
  }
}
