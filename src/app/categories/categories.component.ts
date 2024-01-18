import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Array<any> = [];
  constructor(private cs: CategorieService) { }

  ngOnInit(): void {
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

  deleteCategorie(cat: Categorie) {
    if (confirm('Etes-vous sûr de vouloir supprimer?'))
      this.cs.deleteCategorie(cat)
        .subscribe({
          next: value => {
            this.categories = this.categories.filter(p => p.id != cat.id);
          }
        })
  }

}
