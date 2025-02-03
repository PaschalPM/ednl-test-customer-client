import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSvgComponent } from './base-svg.component';

describe('BaseSvgComponent', () => {
  let component: BaseSvgComponent;
  let fixture: ComponentFixture<BaseSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
