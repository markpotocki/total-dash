import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StocksComponent} from './stocks.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {StocksService} from './stocks.service';
import {StocksAreaChartComponent} from './stocks-area-chart/stocks-area-chart.component';
import {AreaChartModule} from '@swimlane/ngx-charts';
import {MatCardModule} from '@angular/material/card';
import {StockComponent} from './stock/stock.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CompanyInformationComponent} from './company-information/company-information.component';
import {CompanyAutoCompleteComponent} from './company-auto-complete/company-auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FinanceApiToNgxGraphPipe} from './pipes/finance-api-to-ngx-graph.pipe';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {StockQuoteCardComponent} from './stock-quote-card/stock-quote-card.component';
import {StockSearchResultsComponent} from './stock-search-results/stock-search-results.component';
import {MatTableModule} from '@angular/material/table';

const ROUTES: Routes = [
  {
    path: '',
    component: StocksComponent,
    children: [
      {path: ':symbol', component: StockComponent}
    ]
  },
];

@NgModule({
  declarations: [
    StocksComponent,
    StocksAreaChartComponent,
    StockComponent,
    CompanyInformationComponent,
    CompanyAutoCompleteComponent,
    FinanceApiToNgxGraphPipe,
    StockQuoteCardComponent,
    StockSearchResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule,
    AreaChartModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    FormsModule,
    MatTableModule
  ],
  providers: [
    StocksService
  ]
})
export class StocksModule {
}
