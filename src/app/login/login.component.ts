import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup

  listeDesMessagesDErreur: Array<string> = ['Remplir tous les champs']

  constructor(
    private fb: FormBuilder,
    private ls: LoginService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.tokenService.redirigerSiDejaConnecte()
    this.loginForm = this.fb.group(
      {
        username: this.fb.control('', Validators.required),
        password: this.fb.control('', Validators.required)
      }
    );
  }

  seConnecter() {
    let infoDeConnection = this.loginForm.value;
    console.log(infoDeConnection)
    this.ls.obtenirUnToken(infoDeConnection)
    .subscribe(
      {
        next: data => {
          console.log(data);
          this.tokenService.saveToken(data.access);
        },
        error: err => {
          console.log(err);
          this.listeDesMessagesDErreur = ["mot de pesse ou nom d'utilisateur incorrect"]
        }
      }
    )
  }
}
