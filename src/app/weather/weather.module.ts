import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from './weather.component';
import {RouterModule, Routes} from '@angular/router';
import {WeatherForecastComponent} from './weather-forecast/weather-forecast.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { WindDirectionToIconPipe } from './wind-direction-to-icon.pipe';
import { ExtendedForecastComponent } from './extended-forecast/extended-forecast.component';
import {SharedModule} from '../shared/shared.module';
import { WindDisplayComponent } from './wind-display/wind-display.component';

const ROUTES: Routes = [
  {path: '', component: WeatherComponent}
];

@NgModule({
  declarations: [WeatherComponent, WeatherForecastComponent, WindDirectionToIconPipe, ExtendedForecastComponent, WindDisplayComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        MatCardModule,
        MatListModule,
        MatIconModule,
        SharedModule
    ]
})
export class WeatherModule {
}
