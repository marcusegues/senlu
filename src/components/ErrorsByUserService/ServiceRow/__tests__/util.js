// @flow

import type {
  Degradation,
  DegradationArray,
} from '../../../../types/reducers/query';
import { getColor } from '../util';

const degradation1: Degradation = {
  count: 1,
  degradation: '1',
  logs: [],
  proportions: [],
  timeEnd: '2018-04-27 06:59:36',
  timeStart: '2018-04-27 06:59:36',
  uptime: 'Inaktiv',
  version: '1.11.6',
};

describe('getColor', () => {
  test('returns correct color given zero errors', () => {
    const input1: DegradationArray = [];
    expect(getColor(input1)).toBe('green');
  });

  test('returns correct color given less than ten errors', () => {
    const input2: DegradationArray = [degradation1];
    expect(getColor(input2)).toBe('yellow');
  });

  test('returns correct color given more than ten errors', () => {
    const input3: DegradationArray = [
      degradation1,
      degradation1,
      degradation1,
      degradation1,
      degradation1,
      degradation1,
      degradation1,
      degradation1,
      degradation1,
      degradation1,
      degradation1,
    ];
    expect(getColor(input3)).toBe('red');
  });
});
