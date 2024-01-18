import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  visuallyHiddenBeforeAddClick: string = "visually-hidden";
  visuallyHiddenAfterAddClick: string = "";
  categorieForm!: FormGroup;

  categories: Array<any> = [];
  constructor(private cs: CategorieService,
    private fb: FormBuilder,
    private router: Router) { }

  initCategorieForm(): void {
    this.categorieForm = this.fb.group({
      designation: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.initCategorieForm();
    this.cs.getAllCategories()
      .subscribe({
        next: data => {
          this.categories = data
        },
        error: err => {
          console.log(err);
        }
      })
  }

  addCategorieButtonClick(): void {
    this.visuallyHiddenAfterAddClick = this.visuallyHiddenBeforeAddClick;
    this.visuallyHiddenBeforeAddClick = "";
    this.initCategorieForm();
  }

  closeAddCategorie(): void {
    this.visuallyHiddenBeforeAddClick = this.visuallyHiddenAfterAddClick;
    this.visuallyHiddenAfterAddClick = "";
    //this.categorieForm.value.designation = "";
  }

  checkSubmitButtonClick(): void {
    //if (this.categorieForm.value.designation != "") {
    if (this.categorieForm.valid) {
      this.cs.saveCategorie(this.categorieForm.value)
        .subscribe({
          next: data => {
            this.ngOnInit();
          }
        });
    }
  }

  deleteCategorie(cat: Categorie) {
    if (confirm('Etes-vous sûr de vouloir supprimer?'))
      this.cs.deleteCategorie(cat)
        .subscribe({
          next: value => {
            this.categories = this.categories.filter(p => p.id != cat.id);
          }
        })
  }

  editerCategorie(cat: Categorie) {
    this.router.navigateByUrl(`editer-categorie/${cat.id}`);
  }

}
