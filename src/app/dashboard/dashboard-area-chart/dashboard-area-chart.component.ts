import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-area-chart',
  templateUrl: './dashboard-area-chart.component.html',
  styleUrls: ['./dashboard-area-chart.component.scss']
})
export class DashboardAreaChartComponent implements OnInit {

  // options
  legend = false;
  showLabels = false;
  animations = true;
  xAxis = true;
  yAxis = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  xAxisLabel = 'Time';
  yAxisLabel = 'Requests';
  timeline = false;
  gradient = true;
  @Input() data: any;

  colorScheme = {
    domain: ['#39b7cd', '#f44336']
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
