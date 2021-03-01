import {Component, OnInit} from '@angular/core';
import {AppSettings, THEMES} from './types/AppSettings';
import {SettingsService} from '../services/settings/settings.service';
import {WeatherService} from '../services/weather/weather.service';
import {switchMap, take} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GridPointCoordinates} from '../services/weather/types';

const SNACKBAR_DURATION = 2000;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: AppSettings;
  themes = THEMES;
  newZip = '';

  constructor(
    private settingsService: SettingsService,
    private weatherService: WeatherService,
    private snackbar: MatSnackBar
  ) {
  }

  get favorites(): GridPointCoordinates[] {
    return this.settings.favoriteWeatherLocations;
  }

  ngOnInit(): void {
    this.settings = this.settingsService.settings;
  }

  addFavorite(): void {
    this.weatherService.getCoordinates(this.newZip).pipe(
      switchMap(coords => this.weatherService.getGrid(coords.fields.latitude, coords.fields.longitude)),
      take(1)
    ).subscribe(resp => {
        this.settings.favoriteWeatherLocations = this.settings.favoriteWeatherLocations.concat(resp);
        // save on the add
        this.submit();
        this.snackbar.open(resp.properties.relativeLocation.properties.city + ' added to favorites.', 'Dismiss', {
          duration: SNACKBAR_DURATION
        });
      }
    );
  }

  removeFavorite(favorite: string): void {
    this.settings.favoriteWeatherLocations = this.settings.favoriteWeatherLocations
      .filter(grid => this.getGridId(grid) !== favorite);

    this.submit();
  }

  getGridId(grid: GridPointCoordinates): string {
    return `${grid.properties.gridId}:${grid.properties.gridX}:${grid.properties.gridY}`;
  }

  submit(): void {
    this.settingsService.settings = this.settings;
  }

  getClassFromTheme(theme: string): string {
    return theme.toLowerCase().replace(' ', '-').concat('-theme');
  }

}
