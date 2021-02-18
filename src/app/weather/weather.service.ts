import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {shareReplay, switchMap, tap} from 'rxjs/operators';
import {ForecastProperties, GridPointCoordinates} from './types';

const GRIDPOINT_ENDPOINT = 'https://api.weather.gov/points/';
const LATLONG_ENDPOINT = 'https://api.weather.gov/gridpoints';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _gridPointCache = new Map<string, GridPointCoordinates>();

  constructor(private http: HttpClient) { }

  // typical weather forecast retrieval flow
  // 1. Get current coordinates of location OR lookup ZIP code coords [Component]
  // 2. Fetch point data from API
  // 3. Cache retrieve grid ID and coordinates
  // 4. Fetch weather forecast

  getWeatherReport(latitude, longitude: number): Observable<ForecastProperties> {
    let grid: Observable<GridPointCoordinates>;
    const coordinateString = latitude + ',' + longitude;
    // check cache
    if (this._gridPointCache.has(coordinateString)) {
      // we have the grid in the cache
      grid = of(this._gridPointCache.get(coordinateString));
    } else {
      // not in the cache, we need to retrieve the grid
      grid = this.http.get<GridPointCoordinates>(GRIDPOINT_ENDPOINT + coordinateString).pipe(
        // store the grid in our cache for the next call
        //tap(gridpoint => this._gridPointCache.set(coordinateString, gridpoint)),
        //tap(gridpoint => console.log(gridpoint)) // TODO remove
      );
    }

    return grid.pipe(
      // cancel the http request once we get an answer
      switchMap(gridpoint => this.http.get<ForecastProperties>(
        `${LATLONG_ENDPOINT}/${gridpoint.properties.gridId}/${gridpoint.properties.gridX},${gridpoint.properties.gridY}`
      )),
      //tap(forecast => console.log(forecast)),
      shareReplay(1)
    );

  }

}
