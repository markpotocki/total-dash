import {Component, OnDestroy, OnInit} from '@angular/core';
import {StocksService} from './stocks.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {delay, take} from 'rxjs/operators';
import {CompanySearchResults} from './types/company-search-results';
import {FormControl} from '@angular/forms';
import {CompanyInformation} from './types/company-information';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {

  formControl = new FormControl();
  selectedStockSymbol: string;
  companyInformation: CompanyInformation;

  private subs: Subscription[] = [];

  constructor(private router: Router, private stocksService: StocksService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach( sub => sub.unsubscribe());
  }

  getStock(symbol: string): void {
    this.router.navigate(['/stocks'], {queryParams: {symbol}}).catch( err => console.log(err));
  }

  getAutoComplete(text: string): Observable<CompanySearchResults> {
    return this.stocksService.getAutoCompleteResults(text).pipe(
      take(5),
      delay(400)
    );
  }


}
