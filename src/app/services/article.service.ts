import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url_de_base: string = "http://127.0.0.1:8000/api/articles/";

  constructor(
    private http: HttpClient
  ) { }

  getListArticle(): Observable<Array<Article>> {
    return this.http.get<Array<Article>>(this.url_de_base);
  }
}
