import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stocks-area-chart',
  templateUrl: './stocks-area-chart.component.html',
  styleUrls: ['./stocks-area-chart.component.css']
})
export class StocksAreaChartComponent implements OnInit {

  // options
  legend = false;
  showLabels = false;
  animations = true;
  @Input() xAxis = true;
  @Input() yAxis = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  xAxisLabel = 'Time';
  yAxisLabel = 'Price';
  @Input() timeline = true;
  gradient = false;
  autoScale = true;
  @Input() data: any;

  colorScheme = {
    domain: ['red', 'yellow', 'blue', 'green', 'purple', 'orange']
  };

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
