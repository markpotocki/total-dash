import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StocksService} from '../stocks.service';
import {Observable, Subscription} from 'rxjs';
import {CompanyInformation} from '../../api/finance-api/types/company-information';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent implements OnInit, OnDestroy {

  companyInformation: CompanyInformation;
  @Input() symbol: string;

  private subs: Subscription[] = [];

  constructor(private stocksService: StocksService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const sub = this.route.queryParamMap.pipe(
      switchMap(params => this.getCompanyInformation(params.get('symbol')))
    ).subscribe(
      companyInformation => this.companyInformation = companyInformation,
      err => console.log(err)
    );

    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getCompanyInformation(symbol: string): Observable<CompanyInformation> {
    return this.stocksService.getCompanyInformation(symbol);
  }

}
