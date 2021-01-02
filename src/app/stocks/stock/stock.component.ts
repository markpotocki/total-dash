import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {StocksService} from '../stocks.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  volume: any;
  stocks: Observable<any>;
  symbol: string;

  lastRefresh: Date;
  type: 'intraday' | 'weekly' | 'monthly' = 'intraday';

  constructor(private stocksService: StocksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.stocks = this.route.queryParamMap.pipe(
      switchMap( params =>
          this.getStocks(params.get('symbol'), this.type)
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(value => value.unsubscribe());
  }

  getStocks(symbol: string, type: 'intraday' | 'weekly' | 'monthly'): Observable<any> {
    this.type = type;
    this.symbol = symbol;
    switch (this.type) {
      case 'intraday':
        return this.stocksService.getIntradayStockData$(symbol);
      case 'weekly':
        return this.stocksService.getWeeklyStockData$(symbol);
      case 'monthly':
        return this.stocksService.getMonthlyStockData$(symbol);
    }

  }

}
