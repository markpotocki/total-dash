import {Component, OnDestroy, OnInit} from '@angular/core';
import {merge, Observable, of, Subject, Subscription} from 'rxjs';
import {WeatherService} from '../services/weather/weather.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ForecastProperties, GridPointCoordinates} from '../services/weather/types';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SettingsService} from '../services/settings/settings.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  location = 'City, State';
  weather: ForecastProperties;
  loading = true;
  _weatherSub: Subscription;
  private _done = new Subject();

  constructor(
    private weatherService: WeatherService,
    private readonly geolocation$: GeolocationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit(): void {
    // check if we have a zip to load from our params
    const zipGrid$ = this.route.queryParamMap.pipe(
      filter(params => params.has('zip')),
      map(params => params.get('zip')),
      switchMap(zip => this.weatherService.getCoordinates(zip)),
      switchMap(coords => this.weatherService.getGrid(coords.fields.latitude, coords.fields.longitude))
    );

    const favoriteGrid$ = this.route.queryParamMap.pipe(
      filter(params => params.has('fav') && !params.has('zip')),
      map(params => params.get('fav')),
      map(fav => parseInt(fav, 10)),
      switchMap(fav => fav >= 0 ? of(this.settingsService.settings.favoriteWeatherLocations[fav]) : this.weatherService.currentLocation$)
    );

    const locationGrid$ = this.route.queryParamMap.pipe(
      filter(params => !params.has('zip') && !params.has('fav')),
      tap(_ => console.log('no params')),
      switchMap(_ => this.getCurrentLocation())
    );

    // merge the zip sub and if it was filtered, switch if empty to current location
    merge(zipGrid$, favoriteGrid$, locationGrid$).pipe(
      tap(() => 'got merge back'),
      tap(grid => this.location = `${grid.properties.relativeLocation.properties.city}, ${grid.properties.relativeLocation.properties.state}`),
      switchMap(grid => this.weatherService.getWeatherReport(grid)),
      takeUntil(this._done)
    ).subscribe(
      resp => {
        this.weather = resp;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.snackBar.open('Failed to load weather', 'Dismiss');
      }
    );
  }

  ngOnDestroy(): void {
    this._done.next();
    this._done.complete();
  }

  nightOrDayBackground(isDaytime: boolean): string {
    return isDaytime ?
      'background: linear-gradient(to bottom, #00000c 80%,#150800 100%);' :
      'background: linear-gradient(to bottom, #020111 85%,#191621 100%);';
  }

  private getCurrentLocation(): Observable<GridPointCoordinates> {
    return this.weatherService.currentLocation$;
  }

}
