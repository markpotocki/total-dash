export class GridPointCoordinates {
  properties: {
    gridId: string;
    gridX: number;
    gridY: number;
    relativeLocation: {
      properties: {
        city: string;
        state: string;
      }
    };
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

export class ForecastPeriod {
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


export class LocationRecord {
  recordid: string;
  fields: {
    longitude: number,
    latitude: number
  };
}

export class FavoriteLocation {
  location: string;
  temperature: number;
  temperatureUnit: string;
  icon: string;
}

