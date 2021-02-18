import {Injectable, OnDestroy} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {SettingsService} from '../services/settings.service';
import {CompanyInformation} from '../api/finance-api/types/company-information';
import {FinanceApiService} from '../api/finance-api/finance-api.service';
import {DailyStockData} from '../api/finance-api/types/daily-stock-data';
import {WeeklyStockData} from '../api/finance-api/types/weekly-stock-data';
import {MonthlyStockData} from '../api/finance-api/types/monthly-stock-data';
import {QuoteData} from '../api/finance-api/types/quote-data';
import {CompanySearchResults} from '../api/finance-api/types/company-search-results';
import {tap} from 'rxjs/operators';

@Injectable()
export class StocksService implements OnDestroy {
  private API_KEY: string;
  private subscriptions: Subscription[] = [];

  constructor(private financeApiService: FinanceApiService, private settingsService: SettingsService) {
    const sub = this.settingsService.stockDataAPIKey$.subscribe(
      apiKey => this.API_KEY = apiKey
    );

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getCompanyInformation(symbol: string): Observable<CompanyInformation> {
    return this.financeApiService.getCompanyInformation(symbol);
  }

  getDailyStockData$(symbol: string): Observable<DailyStockData> {
    return this.financeApiService.getDailyStockDataBySymbol(symbol);
  }

  getWeeklyStockData$(symbol: string): Observable<WeeklyStockData> {
    return this.financeApiService.getWeeklyStockDataBySymbol(symbol);
  }

  getMonthlyStockData$(symbol: string): Observable<MonthlyStockData> {
    return this.financeApiService.getMonthlyStockDataBySymbol(symbol);
  }

  getIntradayStockData$(symbol: string): Observable<any> {
    console.warn('Intraday stocks is not yet implemented');
    return of([]);
  }

  getStockQuote(symbol: string): Observable<QuoteData> {
    return this.financeApiService.getQuoteData(symbol);
  }

  getSearchResults(query: string): Observable<CompanySearchResults> {
    return this.financeApiService.getSearchResults(query).pipe(
      tap(results => console.log(results))
    );
  }

}

