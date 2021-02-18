import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardTableComponent} from './dashboard-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [DashboardTableComponent],
  exports: [
    DashboardTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
  ]
})
export class DashboardTableModule {
}
