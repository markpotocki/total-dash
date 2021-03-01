import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ResponsiveService} from './services/responsive/responsive.service';
import {Observable, Subscription} from 'rxjs';
import {SettingsService} from './services/settings/settings.service';
import {AppSettings} from './settings/types/AppSettings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'total-dashboard';
  sideNavOpen: boolean;
  @HostBinding('classList') theme;
  navItems = [
    {
      text: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard'
    },
    {
      text: 'Weather',
      icon: 'thermostat',
      url: '/weather'
    }
  ];
  bottomNavItems = [
    {
      text: 'Settings',
      icon: 'settings',
      url: '/settings'
    }
  ];
  temperature: string;
  location: string;
  private settings: AppSettings;
  private _weatherSubscription: Subscription;

  constructor(
    private responsiveService: ResponsiveService,
    private settingsService: SettingsService,
  ) {
  }

  get isMobile$(): Observable<boolean> {
    return this.responsiveService.isMobile$;
  }

  ngOnInit(): void {
    this.settingsService.getSettings$().subscribe(
      settings => {
        this.settings = settings;
        this.theme = settings.theme;
      }
    );
    // this._loadWeather();
  }

  ngOnDestroy(): void {
    this._weatherSubscription.unsubscribe();
  }

}
