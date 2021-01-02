import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'stocks', loadChildren: () => import('./stocks/stocks.module').then(m => m.StocksModule)},
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
  { path: '', pathMatch: 'full', redirectTo: '/dashboard'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
