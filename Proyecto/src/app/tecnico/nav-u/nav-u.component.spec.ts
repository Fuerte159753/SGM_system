import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUComponent } from './nav-u.component';

describe('NavUComponent', () => {
  let component: NavUComponent;
  let fixture: ComponentFixture<NavUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
