import {GridPointCoordinates} from '../../services/weather/types';

export const THEMES = [
  'Light',
  'Dark',
  'Winter Paradise',
  'Silent Night',
  'Christmas',
  'X09'
];

export class AppSettings {
  // the key for api
  apiKey: string;
  theme: string;
  favoriteStocks: string[] = ['GOOG', 'T', 'MSFT', 'OHI'];
  favoriteWeatherLocations: GridPointCoordinates[];

  constructor() {
    this.apiKey = '';
    this.theme = 'Light';
    this.favoriteWeatherLocations = [];
  }
}
