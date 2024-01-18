import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../services/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novelle-categorie',
  templateUrl: './novelle-categorie.component.html',
  styleUrls: ['./novelle-categorie.component.css']
})
export class NovelleCategorieComponent implements OnInit {
  categorieForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private cat: CategorieService,
    private router: Router) { }

  ngOnInit(): void {
    this.categorieForm = this.fb.group({
      designation: this.fb.control('', [Validators.required])
    });
  }

  saveCategorie() {
    let categorie = this.categorieForm.value;
    this.cat.saveCategorie(categorie)
      .subscribe({
        next: data => {
          //alert(JSON.stringify(data));
          this.router.navigateByUrl("/categories");
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
