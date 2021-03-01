import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() mobile = false;

  constructor(private dashboardService: DashboardService) {
  }

  get data$(): Observable<any> {
    return this.dashboardService.data$;
  }

  ngOnInit(): void {
  }


}
