import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessIndexComponent } from './business-index.component';

describe('BusinessIndexComponent', () => {
  let component: BusinessIndexComponent;
  let fixture: ComponentFixture<BusinessIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
