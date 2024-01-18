import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private http: HttpClient) { }
  categories: Array<any> = [];
  ngOnInit(): void {
    this.http.get<Array<any>>('http://localhost:8888/categories')
      .subscribe({
        next: data => {
          this.categories = data
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
