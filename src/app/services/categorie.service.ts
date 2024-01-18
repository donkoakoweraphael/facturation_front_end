import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get<Array<any>>('http://localhost:8888/categories');
  }

  public deleteCategorie(categorie: Categorie) {
    return this.http.delete<Array<any>>(`http://localhost:8888/categories/${categorie.id}`);
  }

  public saveCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>('http://localhost:8888/categories', categorie);
  }

}
