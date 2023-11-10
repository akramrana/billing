import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryIndexComponent } from './delivery-index.component';

describe('DeliveryIndexComponent', () => {
  let component: DeliveryIndexComponent;
  let fixture: ComponentFixture<DeliveryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
