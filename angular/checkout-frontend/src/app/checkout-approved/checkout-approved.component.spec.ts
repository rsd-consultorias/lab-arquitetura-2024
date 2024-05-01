import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutApprovedComponent } from './checkout-approved.component';

describe('CheckoutApprovedComponent', () => {
  let component: CheckoutApprovedComponent;
  let fixture: ComponentFixture<CheckoutApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutApprovedComponent]
    });
    fixture = TestBed.createComponent(CheckoutApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
