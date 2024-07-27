import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiltecComponent } from './perfiltec.component';

describe('PerfiltecComponent', () => {
  let component: PerfiltecComponent;
  let fixture: ComponentFixture<PerfiltecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfiltecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfiltecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
