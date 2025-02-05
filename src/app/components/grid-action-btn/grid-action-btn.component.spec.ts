import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridActionBtnComponent } from './grid-action-btn.component';

describe('GridActionBtnComponent', () => {
  let component: GridActionBtnComponent;
  let fixture: ComponentFixture<GridActionBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridActionBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridActionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
