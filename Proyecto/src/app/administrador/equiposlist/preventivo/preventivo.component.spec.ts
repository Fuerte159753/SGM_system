import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventivoComponent } from './preventivo.component';

describe('PreventivoComponent', () => {
  let component: PreventivoComponent;
  let fixture: ComponentFixture<PreventivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreventivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
