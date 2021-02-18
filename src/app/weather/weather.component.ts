import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WeatherService} from '../services/weather.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {switchMap, take, tap} from 'rxjs/operators';
import {ForecastProperties} from './types';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  location = 'City, State';
  weather: ForecastProperties;
  loading = true;
  _weatherSub: Subscription;

  constructor(
    private weatherService: WeatherService,
    private readonly geolocation$: GeolocationService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  ngOnDestroy(): void {
    this._weatherSub.unsubscribe();
  }

  private getCurrentLocation(): void {
    this._weatherSub = this.geolocation$.pipe(
      take(1),
      switchMap(position => this.weatherService.getGrid(position.coords.latitude, position.coords.longitude)),
      tap(grid => console.log('props: ' + grid.properties.relativeLocation)),
      tap(grid => this.location = `${grid.properties.relativeLocation.properties.city}, ${grid.properties.relativeLocation.properties.state}`),
      tap(grid => console.log('location is ' + this.location)),
      switchMap(grid => this.weatherService.getWeatherReport(grid)),
      // finalize(() => this.loading = false)
    ).subscribe(
      weather => this.weather = weather,
      err => console.log(err),
      () => this.loading = false
    );
  }

}
