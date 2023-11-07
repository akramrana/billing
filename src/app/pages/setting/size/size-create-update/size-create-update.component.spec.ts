import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeCreateUpdateComponent } from './size-create-update.component';

describe('SizeCreateUpdateComponent', () => {
  let component: SizeCreateUpdateComponent;
  let fixture: ComponentFixture<SizeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
