import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectivoComponent } from './correctivo.component';

describe('CorrectivoComponent', () => {
  let component: CorrectivoComponent;
  let fixture: ComponentFixture<CorrectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorrectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
