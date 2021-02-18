import {StockData} from './stock-data';
import {MonthlyStockData} from './monthly-stock-data';

export interface DailyStockData {
  'Meta Data': MetaData;
  'Time Series (Daily)': { [key: string]: TimeSeriesDaily };
}

export interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': Date;
  '4. Output Size': string;
  '5. Time Zone': string;
}

export interface TimeSeriesDaily {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
  '8. split coefficient': string;
}

export function isDailyStockData(stockData: StockData): stockData is DailyStockData {
  return (stockData as DailyStockData)['Time Series (Daily)'] !== undefined;
}
