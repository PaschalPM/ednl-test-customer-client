import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMultipleComponent } from './user-multiple.component';

describe('UserMultipleComponent', () => {
  let component: UserMultipleComponent;
  let fixture: ComponentFixture<UserMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMultipleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
