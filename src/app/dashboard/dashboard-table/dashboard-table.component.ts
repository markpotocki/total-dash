import {Component, Input, OnInit} from '@angular/core';
import {ResponsiveService} from '../../services/responsive/responsive.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {

  @Input() mini = false;

  dataArray = [
    {modelID: 'FOO_4039230_brk', version: '2', date: new Date(), status: 'fail'},
    {modelID: 'FOO_7832001_brk', version: '1', date: new Date(), status: 'ok'},
    {modelID: 'FOO_3940593_brk', version: '2', date: new Date(), status: 'ok'},
    {modelID: 'FOO_2049494_brk', version: '5', date: new Date(), status: 'ok'},
    {modelID: 'FOO_4078019_brk', version: '3', date: new Date(), status: 'ok'}
  ];

  constructor(private responsiveService: ResponsiveService) {
  }

  get isMobile$(): Observable<boolean> {
    return this.mini ? of(this.mini) : this.responsiveService.isMobile$;
  }

  ngOnInit(): void {

  }

  columnsToRender(isMobile: boolean): string[] {
    return isMobile ? ['modelID', 'status'] : ['modelID', 'version', 'date', 'status'];
  }

  statusIcon(status: string): string {
    switch (status) {
      case 'ok':
        return 'check_circle';
      case 'fail':
        return 'error';
      default:
        return status;
    }
  }

}
