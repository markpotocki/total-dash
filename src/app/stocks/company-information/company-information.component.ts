import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StocksService} from '../stocks.service';
import {Subscription} from 'rxjs';
import {CompanyInformation} from '../types/company-information';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent implements OnInit, OnDestroy {

  companyInformation: CompanyInformation;
  @Input() symbol: string;

  private subs: Subscription[] = [];

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
    this.getCompanyInformation();
  }

  ngOnDestroy(): void {
    this.subs.forEach( sub => sub.unsubscribe());
  }

  getCompanyInformation(): void {
    const sub = this.stocksService.getCompanyInformation(this.symbol).subscribe(
      info => this.companyInformation = info,
      err => console.log(err)
    );

    this.subs.push(sub);
  }

}
