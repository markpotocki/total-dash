export class NgxAreaChartData {
  data: NgxAreaChartDataEntry[];
}

export interface NgxAreaChartDataEntry {
  name: string;
  series: NgxAreaChartDataSeries[];
}

export interface NgxAreaChartDataSeries {
  name: any;
  value: number;
}
