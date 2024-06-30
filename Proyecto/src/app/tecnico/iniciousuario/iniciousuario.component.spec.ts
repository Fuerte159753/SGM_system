import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciousuarioComponent } from './iniciousuario.component';

describe('IniciousuarioComponent', () => {
  let component: IniciousuarioComponent;
  let fixture: ComponentFixture<IniciousuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciousuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IniciousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
