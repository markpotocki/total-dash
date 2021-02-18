import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from './weather.component';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
  {path: '', component: WeatherComponent}
];

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class WeatherModule {
}
