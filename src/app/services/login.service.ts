import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Token } from '../models/token';
import { Observable } from 'rxjs';
import { SignUp } from '../models/sign-up';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url_de_base: string = "http://127.0.0.1:8000/api/";
  endpoint: string = this.url_de_base

  constructor(
    private http: HttpClient,
  ) { }

  obtenirUnToken(infoDeConnection: Login): Observable<Token> {
    this.endpoint = this.url_de_base + "token/";

    return this.http.post<Token>(
      this.endpoint,
      infoDeConnection
    );
  }

  creerUnCompteUtilisateur(infoDeSignUp: SignUp): Observable<any> {
    this.endpoint = this.url_de_base + "sign-up/"
    return this.http.post(this.endpoint, infoDeSignUp)
  }
}
