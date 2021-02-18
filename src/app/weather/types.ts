

export class GridPointCoordinates {
  properties: {
    gridId: string;
    gridX: number;
    gridY: number;
  };
}

export class ForecastProperties {
  updated: Date;
  units: string;
  forecastGenerator: string;
  generatedAt: Date;
  updateTime: Date;
  validTimes: Date;
  elevation: {
    value: number;
    unitCode: string;
  };
  periods: ForecastPeriod[];
}

interface ForecastPeriod {
  number: number;
  name: string;
  startTime: Date;
  endTime: Date;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

