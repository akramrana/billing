import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourCreateUpdateComponent } from './colour-create-update.component';

describe('ColourCreateUpdateComponent', () => {
  let component: ColourCreateUpdateComponent;
  let fixture: ComponentFixture<ColourCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
