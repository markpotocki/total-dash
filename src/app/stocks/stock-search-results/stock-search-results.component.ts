import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BestMatch} from '../../api/finance-api/types/company-search-results';
import {Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {StocksService} from '../stocks.service';

const querySymbol = 'q';

@Component({
  selector: 'app-stock-search-results',
  templateUrl: './stock-search-results.component.html',
  styleUrls: ['./stock-search-results.component.css']
})
export class StockSearchResultsComponent implements OnInit {

  results: BestMatch[];
  sub: Subscription;

  constructor(private route: ActivatedRoute, private stockService: StocksService) {
  }

  // the lookup will come from the stock symbol in the querySymbol param on the current route
  ngOnInit(): void {
    this.sub = this.route.queryParamMap.pipe(
      switchMap(params => {
        const query = params.get(querySymbol);
        return this.stockService.getSearchResults(query);
      }),
      map(searchResults => searchResults.bestMatches)
    ).subscribe(
      results => this.results = results,
      err => console.log(err)
    );
  }

}
