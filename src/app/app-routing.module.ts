import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { NovelleCategorieComponent } from './novelle-categorie/novelle-categorie.component';
import { BindingComponent } from './binding/binding.component';
import { EditerCategorieComponent } from './editer-categorie/editer-categorie.component';

const routes: Routes = [
  {path: "", component: BindingComponent},
  {path: "categories", component: CategoriesComponent},
  {path: "nouvelle-categorie", component: NovelleCategorieComponent},
  {path: "editer-categorie/:id", component: EditerCategorieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
