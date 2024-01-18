import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {

  title: string = "Apprendre le Data Binding avec Angular 16";
  status: boolean = true;
  nom: string = "";

  changerTitre() {
    this.title = "Mon nouveau titre";
  }

  changerStatus(){
    this.status = !this.status;
  }
}
