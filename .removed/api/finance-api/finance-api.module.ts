import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FinanceApiService} from './finance-api.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    FinanceApiService,
    // {provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true}
  ]
})
export class FinanceApiModule {
}
