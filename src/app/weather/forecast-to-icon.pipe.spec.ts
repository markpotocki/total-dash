import {ForecastToIconPipe} from './forecast-to-icon.pipe';


// specs
// Inputs
//  has ... Sunny > fore_sunny
//  has ... Snow > fore_snowy
//  has ... Rainy > fore_rainy
//  has ... Cloudy > fore_cloudy
describe('ForecastToIconPipe', () => {
  it('create an instance', () => {
    const pipe = new ForecastToIconPipe();
    expect(pipe).toBeTruthy();
  });

  it('Test Sunny to fore_sunny', () => {
    const pipe = new ForecastToIconPipe();
    const input = 'Sunny';
    const expected = 'fore_sunny';
    let actual;

    // the test
    actual = pipe.transform(input);
    // assert
    expect(actual.length).toEqual(1); // only one element here
    expect(actual[0]).toEqual(expected, printFailedAssertion(expected, actual));
  });

  it('Test Snow fore fore_snowy', () => {
    const pipe = new ForecastToIconPipe();
    const input = 'Snow';
    const expected = 'fore_snowy';
    let actual;

    // the test
    actual = pipe.transform(input);
    // assert
    expect(actual.length).toEqual(1);
    expect(actual[0]).toEqual(expected, printFailedAssertion(expected, actual));
  });

});

function printFailedAssertion<T>(expected: T, actual: T): void {
  const msg = `assertion failed -- [expected: ${expected} actual: ${actual}]`;
  console.log(msg);
}
