import {Injectable} from '@angular/core';
import {SettingsService} from '../../../src/app/services/settings.service';
import {Observable} from 'rxjs';
import {MonthlyStockData} from './types/monthly-stock-data';
import {WeeklyStockData} from './types/weekly-stock-data';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DailyStockData} from './types/daily-stock-data';
import {CompanyInformation} from './types/company-information';
import {QuoteData} from './types/quote-data';
import {takeWhile} from 'rxjs/operators';
import {CompanySearchResults} from './types/company-search-results';

// API function variables
const ADJUSTED_SUFFIX = '_ADJUSTED';
const INTRADAY_STOCK_FUNCTION = 'TIME_SERIES_INTRADAY';
const DAILY_STOCK_FUNCTION = 'TIME_SERIES_DAILY';
const WEEKLY_STOCK_FUNCTION = 'TIME_SERIES_WEEKLY';
const MONTHLY_STOCK_FUNCTION = 'TIME_SERIES_MONTHLY';
const COMPANY_INFORMATION_FUNCTION = 'OVERVIEW';
const GLOBAL_QUOTE_FUNCTION = 'GLOBAL_QUOTE';
const SEARCH_FUNCTION = 'SYMBOL_SEARCH';

// API url
const API_URL = 'https://www.alphavantage.co/query';

@Injectable()
export class FinanceApiService {

  private API_KEY: string;

  constructor(private settingsService: SettingsService, private http: HttpClient) {
    this.settingsService.getSettings$().subscribe(
      settings => this.API_KEY = settings.apiKey,
      err => console.error(err)
    );
  }

  getWeeklyStockDataBySymbol(symbol: string, unadjusted?: boolean): Observable<WeeklyStockData> {
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('apikey', this.API_KEY)
      .set('function', unadjusted ? WEEKLY_STOCK_FUNCTION : WEEKLY_STOCK_FUNCTION + ADJUSTED_SUFFIX);
    return this.http.get<WeeklyStockData>(API_URL, {params});
  }

  getMonthlyStockDataBySymbol(symbol: string, unadjusted?: boolean): Observable<MonthlyStockData> {
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('apikey', this.API_KEY)
      .set('function', unadjusted ? MONTHLY_STOCK_FUNCTION : MONTHLY_STOCK_FUNCTION + ADJUSTED_SUFFIX);
    return this.http.get<MonthlyStockData>(API_URL, {params});
  }

  getDailyStockDataBySymbol(symbol: string, unadjusted?: boolean): Observable<DailyStockData> {
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('apikey', this.API_KEY)
      .set('function', unadjusted ? DAILY_STOCK_FUNCTION : DAILY_STOCK_FUNCTION + ADJUSTED_SUFFIX);
    return this.http.get<DailyStockData>(API_URL, {params});
  }

  getCompanyInformation(symbol: string): Observable<CompanyInformation> {
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('apikey', this.API_KEY)
      .set('function', COMPANY_INFORMATION_FUNCTION);
    return this.http.get<CompanyInformation>(API_URL, {params});
  }

  getQuoteData(symbol: string): Observable<QuoteData> {
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('apikey', this.API_KEY)
      .set('function', GLOBAL_QUOTE_FUNCTION);
    return this.http.get<QuoteData>(API_URL, {params});
  }

  getSearchResults(query: string): Observable<CompanySearchResults> {
    const params = new HttpParams()
      .set('function', SEARCH_FUNCTION)
      .set('apikey', this.API_KEY)
      .set('keywords', query);
    return this.http.get<CompanySearchResults>(API_URL, {params});
  }

  private addRetryLogic(requestObservable: Observable<any>): Observable<any> {
    // if it fails, it is usually because we do not have any api calls left
    // we can taper the call by 10 seconds and retry a couple of times
    return requestObservable.pipe(
      takeWhile(value => value.Note !== undefined) // check if we get API failure note
    );
  }

}
