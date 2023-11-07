import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourIndexComponent } from './colour-index.component';

describe('ColourIndexComponent', () => {
  let component: ColourIndexComponent;
  let fixture: ComponentFixture<ColourIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
