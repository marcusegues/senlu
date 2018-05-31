// @flow

import {addParamsToUrl, removeDotsFromMacAddress} from './utils';
import { harryUrl } from './utils/urls';
import type {
  DegradationsByService,
  MacAddress,
} from '../types/reducers/query';

export const getBackendDegradationsByMac = (
  macAddress: MacAddress,
  timeSpanStart: string,
  timeSpanEnd: string
): Promise<DegradationsByService> => {
  const macNoDots = removeDotsFromMacAddress(macAddress);
  return fetch(
    addParamsToUrl(`${harryUrl()}/get_degradations`, {
      mac: macNoDots,
      timespan_start: timeSpanStart,
      timespan_end: timeSpanEnd,
    })
  ).then(response => {
    // eslint-disable-next-line no-console
    console.log('Harry response is', response);
    return response.json();
  });
};
