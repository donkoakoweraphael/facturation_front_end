import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import { CategoriesComponent } from './categories/categories.component';
import { NovelleCategorieComponent } from './novelle-categorie/novelle-categorie.component';
import { EditerCategorieComponent } from './editer-categorie/editer-categorie.component';

@NgModule({
  declarations: [
    AppComponent,
    BindingComponent,
    CategoriesComponent,
    NovelleCategorieComponent,
    EditerCategorieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
