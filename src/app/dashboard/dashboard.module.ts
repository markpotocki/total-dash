import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {AreaChartModule, NumberCardModule} from '@swimlane/ngx-charts';
import {DashboardAreaChartComponent} from './dashboard-area-chart/dashboard-area-chart.component';
import {DashboardTableModule} from './dashboard-table/dashboard-table.module';
import {DashboardNumberChartComponent} from './dashboard-number-chart/dashboard-number-chart.component';

const ROUTES: Routes = [
  {path: '', component: DashboardComponent}
];

@NgModule({
  declarations: [DashboardComponent, DashboardAreaChartComponent, DashboardNumberChartComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AreaChartModule,
    DashboardTableModule,
    NumberCardModule
  ]
})
export class DashboardModule {
}
