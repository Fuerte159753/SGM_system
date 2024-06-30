import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEquiposComponent } from './registro-equipos.component';

describe('RegistroEquiposComponent', () => {
  let component: RegistroEquiposComponent;
  let fixture: ComponentFixture<RegistroEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
