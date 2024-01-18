import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editer-categorie',
  templateUrl: './editer-categorie.component.html',
  styleUrls: ['./editer-categorie.component.css']
})
export class EditerCategorieComponent implements OnInit {
  categorieId!: number;
  categorieForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private cats: CategorieService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.categorieId = this.activatedRoute.snapshot.params['id'];
    this.cats.getCategoryById(this.categorieId)
      .subscribe({
        next: categorie => {
          this.categorieForm = this.fb.group({
            id: this.fb.control(categorie.id),
            designation: this.fb.control(categorie.designation,
              [Validators.required])
          })
        },
        error: err => {
          console.log(err);
        }
      });
  }

  updateCategorie() {
    let categorie = this.categorieForm.value;
    this.cats.updateCategorie(categorie)
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
