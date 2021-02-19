import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {ForecastProperties, GridPointCoordinates} from '../weather/types';
import {MatSnackBar} from '@angular/material/snack-bar';

const GRIDPOINT_ENDPOINT = 'https://api.weather.gov/points';
const LATLONG_ENDPOINT = 'https://api.weather.gov/gridpoints';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _gridSubject: Observable<GridPointCoordinates>;
  private _forecastSubject: Observable<ForecastProperties>;

  private _gridPointCache = new Map<string, GridPointCoordinates>();
  private i = 0;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    console.log('init service ' + this);
  }

  // typical weather forecast retrieval flow
  // 1. Get current coordinates of location OR lookup ZIP code coords [Component]
  // 2. Fetch point data from API
  // 3. Cache retrieve grid ID and coordinates
  // 4. Fetch weather forecast

  getGrid(latitude: number, longitude: number, forceReload?: boolean): Observable<GridPointCoordinates> {
    // const coordinateString = latitude + ',' + longitude;
    // check cache
    if (!this._gridSubject || forceReload) {
      this._gridSubject = this._fetchGrid(latitude, longitude).pipe(
        shareReplay(1)
      );
    }
    return this._gridSubject;

  }

  private _fetchGrid(latitude: number, longitude: number): Observable<GridPointCoordinates> {
    const coordinateString = latitude + ',' + longitude;
    return this.http.get<GridPointCoordinates>(`${GRIDPOINT_ENDPOINT}/${coordinateString}`);
  }

  getWeatherReport(grid: GridPointCoordinates, forceReload?: boolean): Observable<ForecastProperties> {
    // cancel the http request once we get an answer
    if (!this._forecastSubject || forceReload) {
      this._forecastSubject = this._fetchWeatherReport(grid).pipe(
        shareReplay(1)
      );
    }

    return this._forecastSubject;
  }

  private _fetchWeatherReport(grid: GridPointCoordinates): Observable<ForecastProperties> {
    return this.http.get<any>(
      `${LATLONG_ENDPOINT}/${grid.properties.gridId}/${grid.properties.gridX},${grid.properties.gridY}/forecast`
    ).pipe(
      map(gridPoint => gridPoint.properties)
    );
  }

  private handleError(message: string): Array<any> {
    this.snackBar.open(message, 'Dismiss');
    console.error(message);
    return [];
  }

}
