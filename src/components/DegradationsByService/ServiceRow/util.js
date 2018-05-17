// @flow
import type { TrafficLightColor } from '../../../svg/TrafficLight';

export const getColor = (errors: Array<any>): TrafficLightColor => {
  const len: number = errors.length;
  if (len === 0) {
    return 'green';
  } else if (len < 10) {
    return 'yellow';
  }
  return 'red';
};
