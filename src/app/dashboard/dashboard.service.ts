import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  graph1ExampleData = [
    {
      name: 'Requests',
      series: [
        {name: new Date(), value: 0}
      ]
    },
    {
      name: 'Errors',
      series: [
        {name: new Date(), value: 0}
      ]
    }
  ];

  private currentValue = 2500;
  private dataSubject = new BehaviorSubject(this.graph1ExampleData);

  constructor() {
    setInterval(() => this.generateRandomData(), 1000);
  }

  get data$(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  private generateRandomData(): void {
    const newVal = this.currentValue + (0.7 - Math.random()) * (this.currentValue / 10);
    const currentVal = this.dataSubject.getValue().concat();
    const timeStamp = new Date();
    // for our dummy good data
    currentVal[0].series.push({
      name: timeStamp,
      value: newVal
    });

    // dummy bad
    currentVal[1].series.push({
      name: timeStamp,
      value: newVal * (Math.random() % .1)
    });

    this.dataSubject.next(currentVal);
  }


}
