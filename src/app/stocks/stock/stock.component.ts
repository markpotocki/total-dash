import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {StocksService} from '../stocks.service';
import {ActivatedRoute} from '@angular/router';
import {filter, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {

  volume: any;
  stocks: Observable<any>;
  @Input() symbol: string;
  lastRefresh: Date;
  private subs: Subscription[] = [];

  constructor(private stocksService: StocksService, private route: ActivatedRoute) {
  }

  _type = 'daily';

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this.selectView(type);
  }

  ngOnInit(): void {
    if (this.symbol !== undefined) {
      this.stocks = this.getStocks(this.symbol, this.type);
    } else {
      this.stocks = this.route.queryParamMap.pipe(
        filter(params =>
          params.has('symbol')
        ),
        switchMap(params =>
          this.getStocks(params.get('symbol'), this.type)
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
  }

  selectView(type: string): void {
    this.stocks = this.getStocks(this.symbol, type);
  }

  getStocks(symbol: string, type: string): Observable<any> {
    switch (type) {
      case 'intraday':
        return this.stocksService.getIntradayStockData$(symbol).pipe(
          tap(stockData => {
            console.log('DEBUG\n\nStockData\n' + Object.entries(stockData));
            this.symbol = stockData['Meta Data']['2. Symbol'];
            this.lastRefresh = stockData['Meta Data']['3. Last Refreshed'];
          })
        );
      case 'daily':
        return this.stocksService.getDailyStockData$(symbol).pipe(
          tap(stockData => {
            console.log('DEBUG\n\nStockData\n' + Object.entries(stockData));
            this.symbol = stockData['Meta Data']['2. Symbol'];
            this.lastRefresh = stockData['Meta Data']['3. Last Refreshed'];
          })
        );
      case 'weekly':
        return this.stocksService.getWeeklyStockData$(symbol).pipe(
          tap(stockData => {
            console.log('DEBUG\n\nStockData\n' + Object.entries(stockData));
            this.symbol = stockData['Meta Data']['2. Symbol'];
            this.lastRefresh = stockData['Meta Data']['3. Last Refreshed'];
          })
        );
      case 'monthly':
        return this.stocksService.getMonthlyStockData$(symbol).pipe(
          tap(stockData => {
            console.log('DEBUG\n\nStockData\n' + Object.entries(stockData));
            this.symbol = stockData['Meta Data']['2. Symbol'];
            this.lastRefresh = stockData['Meta Data']['3. Last Refreshed'];
          })
        );
    }
  }

  private extractMetaData(result: Observable<any>): Observable<any> {
    return result.pipe(
      tap(stockData => {
        console.log('DEBUG\n\nStockData\n' + Object.entries(stockData));
        this.symbol = stockData['Meta Data']['2. Symbol'];
        this.lastRefresh = stockData['Meta Data']['3. Last Refreshed'];
      })
    );
  }

}
