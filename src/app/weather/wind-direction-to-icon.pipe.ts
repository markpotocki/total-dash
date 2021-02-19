import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windDirectionToIcon'
})
export class WindDirectionToIconPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'string') {
      switch (value) {
        case 'N':
          return 'north';
        case 'E':
          return 'east';
        case 'S':
          return 'south';
        case 'W':
          return 'west';
        case 'NW':
          return 'north_west';
        case 'NE':
          return 'north_east';
        case 'SW':
          return 'south_west';
        case 'SE':
          return 'south_east';
        case 'WNW':
          return 'north_west';
      }
    }
    return value;
  }

}
