import {Pipe, PipeTransform} from '@angular/core';

const forecastToIconDictionary = {
  sunny: 'fore_sunny',
  snow: 'fore_snowy',
  rain: 'fore_rainy',
  cloudy: 'fore_cloudy',
};

@Pipe({
  name: 'forecastToIcon'
})
export class ForecastToIconPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string[] {
    // take in the string
    // split it by the 'then'
    // find both in the dictionary
    // return the icon list
    return value
      .toLowerCase() // set all to lowercase for comparison
      .split('then') // two part forecasts have a then separating
      .map(forecastArray => forecastArray.split(' ')) // split the strings to find our icon keys
      .map(forecastArray => forecastArray.filter(val => Object.keys(forecastToIconDictionary).includes(val))) // drop anything unmappable
      .reduce((prev, curr) => prev.concat(...curr))
      .map(forecast => forecastToIconDictionary[forecast]);
  }

}
