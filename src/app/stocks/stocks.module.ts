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
import {ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const ROUTES: Routes = [
  {
    path: '',
    component: StocksComponent,
    children: [
      { path: ':symbol', component: StockComponent }
    ]},
];

@NgModule({
  declarations: [StocksComponent, StocksAreaChartComponent, StockComponent, CompanyInformationComponent, CompanyAutoCompleteComponent],
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
    MatAutocompleteModule
  ],
  providers: [
    StocksService
  ]
})
export class StocksModule { }
