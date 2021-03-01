import {Component, Input, OnInit} from '@angular/core';
import {ForecastPeriod} from '../../services/weather/types';

@Component({
  selector: 'app-extended-forecast',
  templateUrl: './extended-forecast.component.html',
  styleUrls: ['./extended-forecast.component.scss']
})
export class ExtendedForecastComponent implements OnInit {

  @Input() forecasts: ForecastPeriod[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getForecastId(index: number, forecast: ForecastPeriod): string {
    return forecast.startTime.toString();
  }

}
