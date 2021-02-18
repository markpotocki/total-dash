import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardAreaChartComponent} from './dashboard-area-chart.component';

describe('DashboardAreaChartComponent', () => {
  let component: DashboardAreaChartComponent;
  let fixture: ComponentFixture<DashboardAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAreaChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
