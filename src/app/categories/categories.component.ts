import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: Array<any> = [
    { id: 1, designation: "Informatique" },
    { id: 2, designation: "Automibile" },
    { id: 3, designation: "Electronique" }
  ];
}
