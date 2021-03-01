import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-number-chart',
  templateUrl: './dashboard-number-chart.component.html',
  styleUrls: ['./dashboard-number-chart.component.scss']
})
export class DashboardNumberChartComponent implements OnInit {

  colorScheme = {
    domain: ['blue', 'red', 'green', 'purple', 'grey', 'yellow']
  };
  cardColor = 'white';

  data = [
    {name: 'Running', value: 14302},
    {name: 'Down', value: 7},
    {name: 'Cost', value: 76483},
    {name: 'Monitors', value: 42},
    {name: 'Peers', value: 243034},
    {name: 'Warnings', value: 56}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }


}
