import {Component, Input, OnInit} from '@angular/core';
import {ForecastPeriod} from '../../services/weather/types';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  @Input() location: string;
  @Input() forecast: ForecastPeriod;
  @Input() compact = false;

  @Input() title: string;
  @Input() subtitle: string;
  @Input() details: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
