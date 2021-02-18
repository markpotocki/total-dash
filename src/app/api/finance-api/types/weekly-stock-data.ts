import {StockData} from './stock-data';

export interface WeeklyStockData {
  'Meta Data': MetaData;
  'Weekly Adjusted Time Series': { [key: string]: WeeklyAdjustedTimeSery };
}

export interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': Date;
  '4. Time Zone': string;
}

export interface WeeklyAdjustedTimeSery {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
}

export function isWeeklyStockData(stockData: StockData): stockData is WeeklyStockData {
  return (stockData as WeeklyStockData)['Weekly Adjusted Time Series'] !== undefined;
}
