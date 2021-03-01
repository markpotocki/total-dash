import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry, shareReplay, switchMap, take} from 'rxjs/operators';
import {ForecastProperties, GridPointCoordinates, LocationRecord} from './types';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GeolocationService} from '@ng-web-apis/geolocation';

const GRIDPOINT_ENDPOINT = 'https://api.weather.gov/points';
const LATLONG_ENDPOINT = 'https://api.weather.gov/gridpoints';
export const ZIP_API_URL = 'https://public.opendatasoft.com/api/records/1.0/search/';
const DATASET_ID = 'us-zip-code-latitude-and-longitude';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _grid$Cache: Map<string, Observable<GridPointCoordinates>>;
  private _forecast$Cache: Map<string, Observable<ForecastProperties>>;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private readonly geolocation$: GeolocationService
  ) {
    this._grid$Cache = new Map<string, Observable<GridPointCoordinates>>();
    this._forecast$Cache = new Map<string, Observable<ForecastProperties>>();
  }

  // typical weather forecast retrieval flow
  // 1. Get current coordinates of location OR lookup ZIP code coords [Component]
  // 2. Fetch point data from API
  // 3. Cache retrieve grid ID and coordinates
  // 4. Fetch weather forecast

  get currentForecast$(): Observable<ForecastProperties> {
    return this.currentLocation$.pipe(
      switchMap(grid => this.getWeatherReport(grid))
    );
  }

  get currentLocation$(): Observable<GridPointCoordinates> {
    return this.geolocation$.pipe(
      take(1),
      switchMap(position => this.getGrid(position.coords.latitude, position.coords.longitude))
    );
  }

  getGrid(latitude: number, longitude: number, forceReload?: boolean): Observable<GridPointCoordinates> {
    const coordinateString = latitude + ',' + longitude;
    // check cache
    if (!this._grid$Cache.has(coordinateString) || forceReload) {
      this._grid$Cache.set(coordinateString, this._fetchGrid(coordinateString).pipe(
        shareReplay(1)
      ));
    }
    return this._grid$Cache.get(coordinateString);
  }

  getWeatherReport(grid: GridPointCoordinates, forceReload?: boolean): Observable<ForecastProperties> {
    // cancel the http request once we get an answer
    const gridString = `${grid.properties.gridId}:${grid.properties.gridX}:${grid.properties.gridY}`;
    console.log('weatherService#getweatherReport -- [gridString] = ' + gridString);
    // TODO if forceReload is used, the original subscription may not be cancelled
    if (!this._forecast$Cache.has(gridString) || forceReload) {
      this._forecast$Cache.set(gridString, this._fetchWeatherReport(grid).pipe(
        // repeatWhen( () => interval(FORECAST_REFRESH_INTERVAL)),
        shareReplay(1)
      ));
    }
    return this._forecast$Cache.get(gridString);
  }

  getCoordinates(zip: string): Observable<LocationRecord> {
    const params = {
      dataset: DATASET_ID,
      q: zip
    };
    return this.http.get<any>(ZIP_API_URL, {
      params
    }).pipe(
      map(response => response.records),
      map(array => array[0])
    );
  }

  private _fetchGrid(coordinates: string): Observable<GridPointCoordinates> {
    return this.http.get<GridPointCoordinates>(`${GRIDPOINT_ENDPOINT}/${coordinates}`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private _fetchWeatherReport(grid: GridPointCoordinates): Observable<ForecastProperties> {
    return this.http.get<any>(
      `${LATLONG_ENDPOINT}/${grid.properties.gridId}/${grid.properties.gridX},${grid.properties.gridY}/forecast`
    ).pipe(
      map(gridPoint => gridPoint.properties),
      retry(1),
      catchError(err => this.handleError(err))
    );
  }

  private handleError(message: any): Array<any> {
    this.snackBar.open(JSON.stringify(message), 'Dismiss', {
      panelClass: 'error'
    });
    console.error(message);
    return [];
  }

}
