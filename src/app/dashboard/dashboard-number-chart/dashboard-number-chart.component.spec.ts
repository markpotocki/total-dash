import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardNumberChartComponent} from './dashboard-number-chart.component';

describe('DashboardNumberChartComponent', () => {
  let component: DashboardNumberChartComponent;
  let fixture: ComponentFixture<DashboardNumberChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardNumberChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNumberChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
