import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOverviewCardComponent } from './customer-overview-card.component';

describe('CustomerOverviewCardComponent', () => {
  let component: CustomerOverviewCardComponent;
  let fixture: ComponentFixture<CustomerOverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOverviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
