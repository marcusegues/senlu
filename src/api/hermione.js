// @flow
import { addParamsToUrl, removeDotsFromMacAddress } from './utils';
import type {
  DegradationsByService,
  MacAddress,
} from '../types/reducers/query';
import { StatusInfo } from '../components/StatusInfo/StatusInfo';
import { hermioneUrl } from './utils/urls';

export async function getDegradationsByMac(
  macAddress: MacAddress,
  timeSpanStart: string,
  timeSpanEnd: string
): Promise<DegradationsByService> {
  const macNoDots = removeDotsFromMacAddress(macAddress);
  const response = await fetch(
    addParamsToUrl(`${hermioneUrl()}/get_degradations`, {
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
  console.log('Hermione response: ', response);
  return response.json();
}

export const getCurrentStatus = (macAddress: MacAddress): Promise<StatusInfo> =>
  fetch(
    addParamsToUrl(`${hermioneUrl()}/get_current_status`, { mac: macAddress })
  ).then(response => response.json());
