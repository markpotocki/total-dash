import {Component, OnInit} from '@angular/core';
import {AppSettings, THEMES} from './types/AppSettings';
import {SettingsService} from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: AppSettings;
  themes = THEMES;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settings = this.settingsService.settings;
  }

  submit(): void {
    this.settingsService.settings = this.settings;
  }

  getClassFromTheme(theme: string): string {
    return theme.toLowerCase().replace(' ', '-').concat('-theme');
  }

}
