import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreateUpdateComponent } from './payment-create-update.component';

describe('PaymentCreateUpdateComponent', () => {
  let component: PaymentCreateUpdateComponent;
  let fixture: ComponentFixture<PaymentCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
