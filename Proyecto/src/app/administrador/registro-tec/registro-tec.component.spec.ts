import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTecComponent } from './registro-tec.component';

describe('RegistroTecComponent', () => {
  let component: RegistroTecComponent;
  let fixture: ComponentFixture<RegistroTecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroTecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
