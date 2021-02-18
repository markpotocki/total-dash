import {Component, OnDestroy, OnInit} from '@angular/core';
import {StocksService} from './stocks.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {

  formControl = new FormControl();
  selectedStockSymbol: string;
  favoriteStocks: string[];

  private subs: Subscription[] = [];

  constructor(private router: Router, private stocksService: StocksService, private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    const sub = this.settingsService.getSettings$().subscribe(
      settings => this.favoriteStocks = settings.favoriteStocks
    );
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getStock(symbol: string): void {
    this.router.navigate(['/stocks'], {queryParams: {symbol}}).catch(err => console.log(err));
  }

}
