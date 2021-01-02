import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SettingsService} from '../settings.service';
import {catchError, map} from 'rxjs/operators';
import {CompanyInformation} from './types/company-information';
import {CompanySearchResults} from './types/company-search-results';

const INTRADAY_STOCK_FUNCTION = 'TIME_SERIES_INTRADAY';
const WEEKLY_STOCK_FUNCTION = 'TIME_SERIES_WEEKLY_ADJUSTED';
const MONTHLY_STOCK_FUNCTION = 'TIME_SERIES_MONTHLY_ADJUSTED';

@Injectable()
export class StocksService implements OnDestroy {

  private STOCK_PROVIDER_URL = 'https://www.alphavantage.co/query';
  private INTERVAL = '5min';
  private API_KEY: string;

  private intradayStocksSubject: BehaviorSubject<any>;
  private weeklyStocksSubject: BehaviorSubject<any>;
  private monthlyStocksSubject: BehaviorSubject<any>;
  private _lastSeenSymbol = '';
  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private settingsService: SettingsService) {
    const sub = this.settingsService.stockDataAPIKey$.subscribe(
      apiKey => this.API_KEY = apiKey
    );

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private fetch(symbol: string, func: string, subject: Subject<any>): void {
    const baseParams = new HttpParams()
      .set('symbol', symbol)
      .set('interval', this.INTERVAL)
      .set('apikey', this.API_KEY);

    // .set('function', WEEKLY_STOCK_FUNCTION)
    this.createBaseHttpRequest(baseParams.set('function', func)).subscribe(
      val => subject.next(val)
    );
  }

  getAutoCompleteResults(text: string): Observable<CompanySearchResults> {
    const params = new HttpParams()
      .set('apikey', this.API_KEY)
      .set('function', 'SYMBOL_SEARCH')
      .set('keywords', text);

    return this.http.get<CompanySearchResults>(this.STOCK_PROVIDER_URL, {params});
  }

  getCompanyInformation(symbol: string): Observable<CompanyInformation> {
    const baseParams = new HttpParams()
      .set('symbol', symbol)
      .set('interval', this.INTERVAL)
      .set('apikey', this.API_KEY)
      .set('function', 'OVERVIEW');

    return this.http.get<CompanyInformation>(this.STOCK_PROVIDER_URL, {params: baseParams});
  }

  getWeeklyStockData$(symbol: string): Observable<any> {
    if (!this.weeklyStocksSubject || symbol !== this._lastSeenSymbol) {
      // no source initialized yet, initialize it here
      this.weeklyStocksSubject = new BehaviorSubject<any>([]);
      this.fetch(symbol, WEEKLY_STOCK_FUNCTION, this.weeklyStocksSubject);
    }
    this._lastSeenSymbol = symbol;
    return this.weeklyStocksSubject.asObservable();
  }

  getMonthlyStockData$(symbol: string): Observable<any> {
    if (!this.monthlyStocksSubject || symbol !== this._lastSeenSymbol) {
      // no source initialized yet, initialize it here
      this.monthlyStocksSubject = new BehaviorSubject<any>([]);
      this.fetch(symbol, MONTHLY_STOCK_FUNCTION, this.monthlyStocksSubject);
    }
    this._lastSeenSymbol = symbol;
    return this.monthlyStocksSubject.asObservable();
  }

  getIntradayStockData$(symbol: string): Observable<any> {
    if (!this.intradayStocksSubject || symbol !== this._lastSeenSymbol) {
      // no source initialized yet, initialize it here
      this.intradayStocksSubject = new BehaviorSubject<any>([]);
      this.fetch(symbol, INTRADAY_STOCK_FUNCTION, this.intradayStocksSubject);
    }
    this._lastSeenSymbol = symbol;
    return this.intradayStocksSubject.asObservable();
  }

  private createBaseHttpRequest(params: HttpParams): Observable<any> {
    return this.http.get(this.STOCK_PROVIDER_URL, {params}).pipe(
      catchError( err => {
        console.log(err);
        return [];
      }),
      map(value =>
        this.formatAPIData(value)
      )
    );
}

  private formatAPIData(data: any): any[] {
    // first, let's split the metadata and stock data
    const dataArray = Object.entries(data); // convert to an array to deal with unstructurted data
    console.log('dattaArray is ' + dataArray);
    const metaData = dataArray[0][1];

    const stockData = dataArray[1][1]; // extra 1 is because we want it's value
    console.log(data);
    // the new graph object
    const stockGraphData = [
      {
        name: 'Open',
        series: []
      },
      {
        name: 'High',
        series: []
      },
      {
        name: 'Low',
        series: []
      },
      {
        name: 'Close',
        series: []
      }
    ];

    const volumeGraphData = [
      {
        name: 'Volume',
        series: []
      }
    ];

    // loop through each time series entry
    const stockDataArray = Object.entries(stockData);
    stockDataArray.forEach(item => {
      // let's build the object now with our header
      const time = new Date(item[0]);
      // now each has a open, high, low, close, volume
      const stockDataEntryArray = Object.entries(item[1]);
      for (let j = 0; j < 4; j++) { // TODO implement better solution
        let graphDataItem = stockGraphData[j];
        if (j === 4) {
          graphDataItem = volumeGraphData[0];
        }
        graphDataItem.series.push({
          name: time,
          value: stockDataEntryArray[j][1]
        });
      }
    });

    return stockGraphData;
  }
}

