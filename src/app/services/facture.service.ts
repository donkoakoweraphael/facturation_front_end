import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListDesAchats } from '../models/liste-des-achats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  url_de_base: string = "http://127.0.0.1:8000/api/factures/";

  constructor(
    private http: HttpClient
  ) { }

  envoyerLaListeDesAchats(listDesAchats: ListDesAchats): Observable<any> {
    return this.http.post<ListDesAchats>(this.url_de_base, listDesAchats);
  }
}
