import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { Login } from '../models/login';
import { SignUp } from '../models/sign-up';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm!: FormGroup

  listeDesMessagesDErreur: Array<string> = ['Remplir tous les champs']

  constructor(
    private fb: FormBuilder,
    private ls: LoginService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  initialiserLeFormulaire(): void {
    this.signUpForm = this.fb.group(
      {
        username: this.fb.control('', Validators.required),
        password: this.fb.control('', Validators.required),
        passwordConfirm: this.fb.control('', Validators.required),
        adresse_email: this.fb.control('', Validators.required),
        telephone: this.fb.control('', Validators.required)
      }
    );
  }

  ngOnInit(): void {
    this.tokenService.redirigerSiDejaConnecte()
    this.initialiserLeFormulaire()
  }

  seConnecter(infoDeConnection: Login): void {
    this.ls.obtenirUnToken(infoDeConnection)
      .subscribe(
        {
          next: data => {
            console.log(data);
            this.tokenService.saveToken(data.access);
          },
          error: err => {
            console.log(err);
          }
        }
      )
  }

  creerUnCompte(infoDeSignUp: SignUp): void {
    this.ls.creerUnCompteUtilisateur(infoDeSignUp)
      .subscribe(
        {
          next: data => {
            console.log(data);
            if (data.nom != "") {
              this.listeDesMessagesDErreur = []
              const infoDeLogin: Login = {
                username: infoDeSignUp.nom,
                password: infoDeSignUp.mot_de_passe
              }
              console.log(infoDeLogin)
              this.seConnecter(infoDeLogin)
            } else {
              console.log('Le compte existe déja')
              this.listeDesMessagesDErreur = ['Choisissez un autre nom pour votre compte, celui-ci existe déja']
            }
          },
          error: err => {
            console.log(err);
          }
        }
      )
  }

  submitSignUpClick(): void {
    let infoDeSignUpDuFormulaire = this.signUpForm.value;
    console.log(infoDeSignUpDuFormulaire)
    if (infoDeSignUpDuFormulaire.password == infoDeSignUpDuFormulaire.passwordConfirm) {
      const infoDeSignUp: SignUp = {
        nom: infoDeSignUpDuFormulaire.username,
        mot_de_passe: infoDeSignUpDuFormulaire.password,
        adresse_email: infoDeSignUpDuFormulaire.adresse_email,
        telephone: infoDeSignUpDuFormulaire.telephone
      }
      console.log(infoDeSignUp)
      this.creerUnCompte(infoDeSignUp)
    } else {
      console.log('Les mots de passes ne sont pas les mêmes')
      this.listeDesMessagesDErreur = ['Les mots de passes ne sont pas les mêmes']
    }
  }
}
