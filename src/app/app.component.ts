import {Component, HostBinding, OnInit} from '@angular/core';
import {ResponsiveService} from './services/responsive.service';
import {Observable} from 'rxjs';
import {SettingsService} from './services/settings.service';
import {AppSettings} from './settings/types/AppSettings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
      text: 'Stocks',
      icon: 'attach_money',
      url: '/stocks'
    }
  ];
  bottomNavItems = [
    {
      text: 'Settings',
      icon: 'settings',
      url: '/settings'
    }
  ];
  private settings: AppSettings;

  constructor(private responsiveService: ResponsiveService, private settingsService: SettingsService) {
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
  }

}
