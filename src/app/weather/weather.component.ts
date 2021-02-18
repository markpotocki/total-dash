import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WeatherService} from './weather.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {switchMap} from 'rxjs/operators';
import {ForecastProperties} from './types';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather: ForecastProperties;
  loading = true;

  constructor(
    private weatherService: WeatherService,
    private readonly geolocation$: GeolocationService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  private getCurrentLocation(): void {
    this.geolocation$.pipe(
      switchMap(position => this.weatherService.getWeatherReport(position.coords.latitude, position.coords.longitude))
    ).subscribe(
      weather => this.weather = weather,
      err => console.log(err),
      () => this.loading = false
    );
  }

}
