import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FinanceApiService} from './finance-api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpCacheInterceptor} from '../../interceptors/http-cache.interceptor';


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
