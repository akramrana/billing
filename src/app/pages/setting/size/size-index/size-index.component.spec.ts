import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeIndexComponent } from './size-index.component';

describe('SizeIndexComponent', () => {
  let component: SizeIndexComponent;
  let fixture: ComponentFixture<SizeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
