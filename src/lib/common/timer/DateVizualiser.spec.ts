import { dateToShortString } from './DateVizualizer';

describe('dateToShortString', () => {
  const testCases = [
    { input: new Date(2023, 7, 6, 15, 30, 45), expected: '06.07 15:30' },
    { input: new Date(2023, 1, 3, 9, 5, 0), expected: '03.01 09:05' },
    { input: new Date(2023, 1, 1, 9, 5, 0), expected: '01.01 09:05' },
    { input: new Date(2023, 11, 25, 0, 0, 0), expected: '25.11 00:00' },
    { input: new Date(2023, 11, 25, 0, 50, 0), expected: '25.11 00:50' },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should convert a Date object to the expected string format: ${expected}`, () => {
      const result = dateToShortString(input);
      expect(result).toEqual(expected);
    });
  });
});
