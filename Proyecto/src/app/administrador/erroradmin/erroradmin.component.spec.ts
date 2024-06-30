import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroradminComponent } from './erroradmin.component';

describe('ErroradminComponent', () => {
  let component: ErroradminComponent;
  let fixture: ComponentFixture<ErroradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErroradminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErroradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
