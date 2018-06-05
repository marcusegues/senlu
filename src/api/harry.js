// @flow

import { addParamsToUrl, removeDotsFromMacAddress } from './utils';
import { harryUrl } from './utils/urls';
import type {
  DegradationsByService,
  MacAddress,
} from '../types/reducers/query';

export async function getBackendDegradationsByMac(
  macAddress: MacAddress,
  timeSpanStart: string,
  timeSpanEnd: string
): Promise<DegradationsByService> {
  const macNoDots = removeDotsFromMacAddress(macAddress);
  const response = await fetch(
    addParamsToUrl(`${harryUrl()}/get_degradations`, {
      mac: macNoDots,
      timespan_start: timeSpanStart,
      timespan_end: timeSpanEnd,
    })
  );
  if (response.status !== 200) {
    await response.json().then(data => {
      throw new Error(data.message);
    });
    return {}; // Flow fix
  }
  // eslint-disable-next-line no-console
  console.log('Harry response: ', response);
  return response.json();
}
