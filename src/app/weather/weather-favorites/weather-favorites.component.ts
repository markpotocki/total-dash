import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings/settings.service';
import {concat, merge, Observable, Subject, zip} from 'rxjs';
import {
  concatAll,
  concatMap,
  distinctUntilChanged,
  filter, flatMap,
  map,
  mergeMap,
  scan,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap,
  toArray
} from 'rxjs/operators';
import {WeatherService} from '../../services/weather/weather.service';
import {FavoriteLocation, ForecastProperties, GridPointCoordinates} from '../../services/weather/types';

// max amount of favorites we will display and execute
const FAVORITES_DISPLAY_LIMIT = 5;

interface WeatherFavorite {
  location: string;
  forecast: string;
  forecastUnit: string;
}

@Component({
  selector: 'app-weather-favorites',
  templateUrl: './weather-favorites.component.html',
  styleUrls: ['./weather-favorites.component.scss']
})
export class WeatherFavoritesComponent implements OnInit, OnDestroy {

  private _done = new Subject();
  favorites$: Observable<WeatherFavorite[]>;

  constructor(
    private settingsService: SettingsService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    const locations$ = concat(this.weatherService.currentLocation$, this.settingsService.getSettings$().pipe(
      map(settings => settings.favoriteWeatherLocations),
      mergeMap(favorites => favorites)
    ));

    const forecasts$ = locations$.pipe(
      concatMap(favorite => this.weatherService.getWeatherReport(favorite)), // grid here, get forecast
      tap( f => console.log('got forecast of ' + f.periods[0].temperature)),
    );

    this.favorites$ = zip(locations$, forecasts$).pipe(
      map(value => {
        return {
          location: value[0].properties.relativeLocation.properties.city,
          forecast: value[1].periods[0].temperature.toString(),
          forecastUnit: value[1].periods[0].temperatureUnit
        };
      }), // 0 is grid 1 is forecast
      scan( (acc, arr) => [...acc, arr], new Array<WeatherFavorite>())
    );
  }

  ngOnDestroy(): void {
    this._done.next();
  }

}
