import {MonthlyAdjustedTimeSery, MonthlyStockData} from './monthly-stock-data';
import {WeeklyAdjustedTimeSery, WeeklyStockData} from './weekly-stock-data';
import {DailyStockData, TimeSeriesDaily} from './daily-stock-data';

export type StockData = MonthlyStockData | WeeklyStockData | DailyStockData;
export type TimeSeries = WeeklyAdjustedTimeSery | MonthlyAdjustedTimeSery | TimeSeriesDaily;
