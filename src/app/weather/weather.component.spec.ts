import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WeatherComponent} from './weather.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WeatherService} from '../services/weather/weather.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';

class MockWeatherService {

}

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterModule.forRoot([])],
      providers: [WeatherService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
