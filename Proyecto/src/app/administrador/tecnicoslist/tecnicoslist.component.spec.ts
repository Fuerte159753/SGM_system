import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoslistComponent } from './tecnicoslist.component';

describe('TecnicoslistComponent', () => {
  let component: TecnicoslistComponent;
  let fixture: ComponentFixture<TecnicoslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicoslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecnicoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
