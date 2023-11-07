import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCreateUpdateComponent } from './business-create-update.component';

describe('BusinessCreateUpdateComponent', () => {
  let component: BusinessCreateUpdateComponent;
  let fixture: ComponentFixture<BusinessCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
