import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreateUpdateComponent } from './order-create-update.component';

describe('OrderCreateUpdateComponent', () => {
  let component: OrderCreateUpdateComponent;
  let fixture: ComponentFixture<OrderCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
