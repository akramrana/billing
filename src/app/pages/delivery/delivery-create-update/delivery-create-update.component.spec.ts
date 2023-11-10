import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCreateUpdateComponent } from './delivery-create-update.component';

describe('DeliveryCreateUpdateComponent', () => {
  let component: DeliveryCreateUpdateComponent;
  let fixture: ComponentFixture<DeliveryCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
