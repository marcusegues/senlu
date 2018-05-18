// @flow
import type { TrafficLightColor } from '../../../svg/TrafficLight';

export const getColor = (
  frontendDegradations: Array<any>,
  backendDegradations: Array<any>
): TrafficLightColor => {
  if (backendDegradations.length) {
    return 'red';
  } else if (frontendDegradations.length) {
    return 'yellow';
  }
  return 'green';
};
