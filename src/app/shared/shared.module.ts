import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {
}
