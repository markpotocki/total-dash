import {Component, HostBinding, OnInit} from '@angular/core';
import {ResponsiveService} from './responsive.service';
import {Observable} from 'rxjs';
import {SettingsService} from './settings.service';
import {AppSettings} from './settings/types/AppSettings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'total-dashboard';
  sideNavOpen: boolean;
  private settings: AppSettings;
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

  constructor(private responsiveService: ResponsiveService, private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.getSettings$().subscribe(
      settings => {
        this.settings = settings;
        this.theme = settings.theme;
      }
    );
  }

  get isMobile$(): Observable<boolean> {
    return this.responsiveService.isMobile$;
  }

}
