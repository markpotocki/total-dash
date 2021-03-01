import {WindDirectionToIconPipe} from './wind-direction-to-icon.pipe';

describe('WindDirectionToIconPipe', () => {
  it('create an instance', () => {
    const pipe = new WindDirectionToIconPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert N', () => {
    testConversion('N', 'north');
  });

  it('should convert E', () => {
    testConversion('E', 'east');
  });

  it('should convert S', () => {
    testConversion('S', 'south');
  });

  it('should convert W', () => {
    testConversion('W', 'west');
  });

  it('should convert NE', () => {
    testConversion('NE', 'north_east');
  });

  it('should convert NW', () => {
    testConversion('NW', 'north_west');
  });

  it('should convert SE', () => {
    testConversion('SE', 'south_east');
  });

  it('should convert SW', () => {
    testConversion('SW', 'south_west');
  });

  it('should convert SSE', () => {
    testConversion('SSE', 'south_east');
  });

  it('should return value if unknown', () => {
    testConversion('UNKNOWN', 'UNKNOWN');
  });

  it('should return object if not string', () => {
    const foo = Array.of(1, 2, 3);
    testConversion(foo, foo);
  });

});

const testConversion = (directionInput: any, output: any) => {
  const pipe = new WindDirectionToIconPipe();
  expect(pipe.transform(directionInput)).toEqual(output);
};
