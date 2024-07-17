import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsignadosComponent } from './lista-asignados.component';

describe('ListaAsignadosComponent', () => {
  let component: ListaAsignadosComponent;
  let fixture: ComponentFixture<ListaAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAsignadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
