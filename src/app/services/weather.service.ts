import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {ForecastProperties, GridPointCoordinates} from '../weather/types';
import {MatSnackBar} from '@angular/material/snack-bar';

const GRIDPOINT_ENDPOINT = 'https://api.weather.gov/points/';
const LATLONG_ENDPOINT = 'https://api.weather.gov/gridpoints';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _gridPointCache = new Map<string, GridPointCoordinates>();
  private i = 0;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  // typical weather forecast retrieval flow
  // 1. Get current coordinates of location OR lookup ZIP code coords [Component]
  // 2. Fetch point data from API
  // 3. Cache retrieve grid ID and coordinates
  // 4. Fetch weather forecast

  getGrid(latitude: number, longitude: number): Observable<GridPointCoordinates> {
    console.log('GRID CALL - ' + this.i);
    const coordinateString = latitude + ',' + longitude;
    // check cache
    if (this._gridPointCache.has(coordinateString)) {
      // we have the grid in the cache
      console.log('found cached value');
      return of(this._gridPointCache.get(coordinateString));
    } else {
      // not in the cache, we need to retrieve the grid
      return this.http.get<GridPointCoordinates>(GRIDPOINT_ENDPOINT + coordinateString).pipe(
        // store the grid in our cache for the next call
        tap(gridpoint => this._gridPointCache.set(coordinateString, gridpoint)),
        tap(gridpoint => console.log(gridpoint)), // TODO remove
        shareReplay(1)
      );
    }
  }

  getWeatherReport(grid: GridPointCoordinates): Observable<ForecastProperties> {
    // cancel the http request once we get an answer
    return this.http.get<any>(
      `${LATLONG_ENDPOINT}/${grid.properties.gridId}/${grid.properties.gridX},${grid.properties.gridY}/forecast`
    ).pipe(
      map(gridPointResponse => gridPointResponse.properties),
      catchError(err => this.handleError(err)),
      tap(forecast => console.log(forecast)),
      shareReplay(1),
    );
  }

  private handleError(message: string): Array<any> {
    this.snackBar.open(message, 'Dismiss');
    console.error(message);
    return [];
  }

}
