export const THEMES = [
  'Light',
  'Dark',
  'Winter Paradise',
  'Silent Night',
  'Christmas'
];

export class AppSettings {
  // the key for api
  apiKey: string;
  theme: string;
  favoriteStocks: string[] = ['GOOG', 'T', 'MSFT', 'OHI'];
}
