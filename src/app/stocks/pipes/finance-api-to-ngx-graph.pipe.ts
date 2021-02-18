import {Pipe, PipeTransform} from '@angular/core';
import {NgxAreaChartData} from '../types/ngx-area-chart-data';
import {StockData, TimeSeries} from '../../api/finance-api/types/stock-data';
import {isMonthlyStockData, MonthlyAdjustedTimeSery, MonthlyStockData} from '../../api/finance-api/types/monthly-stock-data';
import {WeeklyAdjustedTimeSery} from '../../api/finance-api/types/weekly-stock-data';
import {TimeSeriesDaily} from '../../api/finance-api/types/daily-stock-data';

@Pipe({
  name: 'financeApiToNgxGraph'
})
export class FinanceApiToNgxGraphPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown{

    console.warn('Pipe received an undefined value.');
    return '';
  }

}
