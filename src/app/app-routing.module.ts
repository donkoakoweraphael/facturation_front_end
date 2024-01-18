import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { NovelleCategorieComponent } from './novelle-categorie/novelle-categorie.component';

const routes: Routes = [
  {path: "categories", component: CategoriesComponent},
  {path: "nouvelle-categorie", component: NovelleCategorieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
