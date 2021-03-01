import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedForecastComponent} from './extended-forecast.component';
import {ForecastPeriod} from '../../services/weather/types';

describe('ExtendedForecastComponent', () => {
  let component: ExtendedForecastComponent;
  let fixture: ComponentFixture<ExtendedForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedForecastComponent]
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

  it('should have startTime for forecast ID', () => {
    const forecast = new ForecastPeriod();
    const startTime = new Date();
    forecast.startTime = startTime;
    const result = component.getForecastId(0, forecast);
    expect(result).toEqual(startTime.toString());
  });
});
