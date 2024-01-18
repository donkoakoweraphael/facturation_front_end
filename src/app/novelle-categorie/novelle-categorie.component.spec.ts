import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelleCategorieComponent } from './novelle-categorie.component';

describe('NovelleCategorieComponent', () => {
  let component: NovelleCategorieComponent;
  let fixture: ComponentFixture<NovelleCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovelleCategorieComponent]
    });
    fixture = TestBed.createComponent(NovelleCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
