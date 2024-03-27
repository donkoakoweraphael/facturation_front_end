import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleDUnAchat } from '../models/article-d-un-achat';
import { LigneDAchat } from '../models/ligne-d-achat';
import { ListDesAchats } from '../models/liste-des-achats';
import { FactureService } from '../services/facture.service';

@Component({
  selector: 'app-formulaire-achat',
  templateUrl: './formulaire-achat.component.html',
  styleUrls: ['./formulaire-achat.component.css']
})
export class FormulaireAchatComponent implements OnInit {

  listDesArticles!: Array<Article>
  listDesArticlesSelectionnes!: Array<Article>
  article!: Array<Article>;

  listeDesChoixAAfficher!: Array<ArticleDUnAchat>
  listeDesLigneAEnvoyer!: Array<LigneDAchat>
  aEteEnvoyeAvecSucess: boolean = false

  formulaire!: FormGroup
  visuallyHiddenBeforeAddClick: string = "visually-hidden";
  visuallyHiddenAfterAddClick: string = "";

  visuallyHiddenWhenNoChoices(): string {
    if (this.listeDesLigneAEnvoyer.length >= 1) {
      return "";
    }
    return "visually-hidden";
  }

  constructor(
    private tokenService: TokenService,
    private articleService: ArticleService,
    private factureService: FactureService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.tokenService.redirigerSiPasConnecte()
    this.initialiserListDesArticles()
    this.initialiserLeFormulaire()
    this.listeDesChoixAAfficher = []
    this.listeDesLigneAEnvoyer = []
  }

  initialiserLeFormulaire(): void {
    this.formulaire = this.fb.group({
      article: [''],
      quantite: this.fb.control(0, [Validators.required, Validators.min(1)])
    });
  }

  initialiserListDesArticles(): void {
    this.articleService.getListArticle().subscribe(
      data => {
        this.listDesArticles = data
        this.listDesArticlesSelectionnes = []
        this.actualiserListDesArticlesASelectionner()
        console.log(this.article)
      },
      error => {
        console.log(error)
      }
    )
  }

  actualiserListDesArticlesASelectionner(): void {
    this.article = this.listDesArticles.filter(
      a => this.listDesArticlesSelectionnes.indexOf(a) == -1)
  }

  ajouterUnArticleAuxOptionsSelectionnees(a: Article): void {
    this.listDesArticlesSelectionnes.push(a)
    this.actualiserListDesArticlesASelectionner()
  }

  enleverUnArticleDesOptionsSelectionnees(a: Article): void {
    this.listDesArticlesSelectionnes.splice(
      this.listDesArticlesSelectionnes.indexOf(a),
      1
    )
    this.actualiserListDesArticlesASelectionner()
  }

  ajouerUnChoix(articleDUnAchat: ArticleDUnAchat): void {
    this.listeDesChoixAAfficher.push(articleDUnAchat)
    console.log(this.listeDesChoixAAfficher)
  }

  supprimerChoix(articleDUnAchat: ArticleDUnAchat): void {
    this.listeDesChoixAAfficher.splice(
      this.listeDesChoixAAfficher.indexOf(articleDUnAchat),
      1
    )
    console.log(this.listeDesChoixAAfficher)
  }

  ajouterLigneDAchat(ligneDAchat: LigneDAchat): void {
    this.listeDesLigneAEnvoyer.push(ligneDAchat)
    console.log(this.listeDesLigneAEnvoyer)
  }

  supprimerLigneDAchat(ligneDAchat: LigneDAchat): void {
    this.listeDesLigneAEnvoyer.splice(
      this.listeDesLigneAEnvoyer.indexOf(ligneDAchat),
      1
    )
    console.log(this.listeDesLigneAEnvoyer)
  }

  addChoixButtonClick(): void {
    this.visuallyHiddenAfterAddClick = this.visuallyHiddenBeforeAddClick;
    this.visuallyHiddenBeforeAddClick = "";
    this.initialiserLeFormulaire();
  }

  closeAddChoix(): void {
    this.visuallyHiddenBeforeAddClick = this.visuallyHiddenAfterAddClick;
    this.visuallyHiddenAfterAddClick = "";
    // this.initialiserLeFormulaire();
  }

  checkSubmitButtonClick(): void {
    if (this.formulaire.valid && this.formulaire.value.id !== '') {
      console.log(this.formulaire.value)
      const a = this.article.find(a => a.id == this.formulaire.value.article)
      this.ajouterUnArticleAuxOptionsSelectionnees(a!)
      console.log(a)
      //
      const ligneDAchat: LigneDAchat = {
        article: a!.id,
        quantite: this.formulaire.value.quantite
      }
      this.ajouterLigneDAchat(ligneDAchat)
      //
      const articleDUnAchat: ArticleDUnAchat = {
        designation: a!.designation,
        prixUnitaire: a!.prix_unitaire,
        quantite: this.formulaire.value.quantite,
        a: a!,
        la: ligneDAchat
      }
      this.ajouerUnChoix(articleDUnAchat)
      //
      this.initialiserLeFormulaire()
    }
  }

  supprimerUneLigneClick(articleDUnAchat: ArticleDUnAchat): void {
    this.enleverUnArticleDesOptionsSelectionnees(articleDUnAchat.a)
    this.supprimerLigneDAchat(articleDUnAchat.la)
    this.supprimerChoix(articleDUnAchat)
  }

  envoyerLaCommandeClick() {
    const listDesAchats: ListDesAchats = {
      ligne_de_facturation: this.listeDesLigneAEnvoyer
    }
    console.log(listDesAchats)
    this.factureService.envoyerLaListeDesAchats(listDesAchats).subscribe(
      data => console.log(data),
      error => console.log(error)
    )
    this.aEteEnvoyeAvecSucess = true
  }

  faireUneNouvelleCommandeClick(): void {
    this.aEteEnvoyeAvecSucess = false
    this.ngOnInit()
  }

  seDeconnecter(): void {
    this.tokenService.removeToken()
  }
}