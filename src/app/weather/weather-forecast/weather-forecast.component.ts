import {Component, Input, OnInit} from '@angular/core';
import {ForecastPeriod} from '../types';

type WeatherForecastComponentSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  @Input() forecast: ForecastPeriod;

  constructor() {
  }

  ngOnInit(): void {
  }

}
