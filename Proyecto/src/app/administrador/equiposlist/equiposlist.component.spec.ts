import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposlistComponent } from './equiposlist.component';

describe('EquiposlistComponent', () => {
  let component: EquiposlistComponent;
  let fixture: ComponentFixture<EquiposlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
