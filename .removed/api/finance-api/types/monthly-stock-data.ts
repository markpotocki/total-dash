import {StockData} from './stock-data';

export interface MonthlyStockData {
  'Meta Data': MetaData;
  'Monthly Adjusted Time Series': { [key: string]: MonthlyAdjustedTimeSery };
}

export interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': Date;
  '4. Time Zone': string;
}

export interface MonthlyAdjustedTimeSery {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
}

export function isMonthlyStockData(stockData: StockData): stockData is MonthlyStockData {
  return (stockData as MonthlyStockData)['Monthly Adjusted Time Series'] !== undefined;
}
