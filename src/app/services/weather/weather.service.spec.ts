import {TestBed} from '@angular/core/testing';

import {WeatherService, ZIP_API_URL} from './weather.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {GridPointCoordinates} from './types';
import {mergeMap} from 'rxjs/operators';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<GridPointCoordinate>', (done) => {
    // set up test
    // API request to https://api.weather.gov/points
    // returns GridPointCoordinate
    const latitude = 50;
    const longitude = 20;
    const gridPoint: GridPointCoordinates = {
      properties: {
        gridId: 'FOO',
        gridX: 40,
        gridY: 10,
        relativeLocation: {
          properties: {
            city: 'Sleepy Hollow',
            state: 'UK'
          }
        }
      }
    };
    // the test
    service.getGrid(latitude, longitude).subscribe(
      response => {
        expect(response).toEqual(response);
        done();
      }
    );
    // http mock
    httpMock
      .expectOne(`https://api.weather.gov/points/${latitude},${longitude}`)
      .flush(gridPoint);
  });

  it('should not duplicate http requests', (done) => {
    // setup
    const latitude = 50;
    const longitude = 20;
    const gridPoint: GridPointCoordinates = {
      properties: {
        gridId: 'FOO',
        gridX: 40,
        gridY: 10,
        relativeLocation: {
          properties: {
            city: 'Sleepy Hollow',
            state: 'UK'
          }
        }
      }
    };
    // the test
    // sub 1
    const sub1$ = service.getGrid(latitude, longitude);
    // sub 2
    const sub2$ = service.getGrid(latitude, longitude);

    sub1$.pipe(
      mergeMap(grid => {
        expect(grid).toEqual(gridPoint);
        return sub2$;
      })
    ).subscribe(
      response => {
        expect(response).toEqual(gridPoint);
        done();
      }
    );

    const url = `https://api.weather.gov/points/${latitude},${longitude}`;
    httpMock
      .expectOne(url)
      .flush(gridPoint);

    httpMock
      .expectNone(url);
  });

  it('should return coordinates', (done) => {
    // input: 60625
    // output: 41.971614, -87.70256
    const zipCode = '60625';
    const expectedLatitude = 41.971614;
    const expectedLongitude = -87.70256;
    const response: any = {
      records: [
        {
          recordid: 'foo',
          fields: {
            longitude: expectedLongitude,
            latitude: expectedLatitude
          }
        }
      ]
    };

    const obs$ = service.getCoordinates(zipCode);
    obs$.subscribe(
      resp => {
        expect(resp.fields.latitude).toBeCloseTo(expectedLatitude);
        expect(resp.fields.longitude).toBeCloseTo(expectedLongitude);
        done();
      }
    );

    // controller
    httpMock
      .expectOne(ZIP_API_URL + '?dataset=us-zip-code-latitude-and-longitude&q=60625')
      .flush(response);

  });

});
