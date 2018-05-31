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

const frontendDegradations1: DegradationArray = [];
const backendDegradations1: DegradationArray = [];

const frontendDegradations2: DegradationArray = [degradation1];
const backendDegradations2: DegradationArray = [degradation1];

describe('getColor', () => {
  test('returns correct color given no degradations of any kind', () => {
    expect(getColor(frontendDegradations1, backendDegradations1)).toBe('green');
  });

  test('returns correct color given only frontend degradations', () => {
    expect(getColor(frontendDegradations2, backendDegradations1)).toBe(
      'yellow'
    );
  });

  test('returns correct color given only backend degradations', () => {
    expect(getColor(frontendDegradations1, backendDegradations2)).toBe('red');
  });

  test('returns correct color given both frontend and backend degradations', () => {
    expect(getColor(frontendDegradations2, backendDegradations2)).toBe('red');
  });
});
