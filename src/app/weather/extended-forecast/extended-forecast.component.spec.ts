import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedForecastComponent } from './extended-forecast.component';

describe('ExtendedForecastComponent', () => {
  let component: ExtendedForecastComponent;
  let fixture: ComponentFixture<ExtendedForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendedForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
