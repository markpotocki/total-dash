import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ResponsiveService} from './services/responsive.service';
import {Observable, Subscription} from 'rxjs';
import {SettingsService} from './services/settings.service';
import {AppSettings} from './settings/types/AppSettings';
import {WeatherService} from './services/weather.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {map, switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
    private weatherService: WeatherService,
    private readonly geolocation: GeolocationService,
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
    this._loadWeather();
  }

  ngOnDestroy(): void {
    this._weatherSubscription.unsubscribe();
  }

  private _loadWeather(): void {
    this._weatherSubscription = this.geolocation.pipe(
      take(1),
      switchMap(position => this.weatherService.getGrid(position.coords.latitude, position.coords.longitude)),
      tap(grid => this.location = grid.properties.relativeLocation.properties.city),
      switchMap(grid => this.weatherService.getWeatherReport(grid)),
      map(weatherReport => weatherReport.periods),
      map(weatherPeriods => weatherPeriods[0])
    ).subscribe(
      currentWeather => this.temperature = currentWeather.temperature + ' ' + currentWeather.temperatureUnit
    );
  }

}
