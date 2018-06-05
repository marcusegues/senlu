// @flow
import { addParamsToUrl, removeDotsFromMacAddress } from './utils';
import type {
  DegradationsByService,
  MacAddress,
} from '../types/reducers/query';
import { StatusInfo } from '../components/StatusInfo/StatusInfo';
import { hermioneUrl } from './utils/urls';

export const getDegradationsByMac = (
  macAddress: MacAddress,
  timeSpanStart: string,
  timeSpanEnd: string
): Promise<DegradationsByService> => {
  const macNoDots = removeDotsFromMacAddress(macAddress);
  return fetch(
    addParamsToUrl(`${hermioneUrl()}/get_degradations`, {
      mac: macNoDots,
      timespan_start: timeSpanStart,
      timespan_end: timeSpanEnd,
    })
  )
    .then(response => {
      // eslint-disable-next-line no-console
      console.log('Hermione response is', response);
      if (response.status !== 200) {
        response.json().then(data => {
          debugger;
          throw new Error(data.message);
        });
      } else {
        debugger;
        return response.json();
      }
      debugger;
    })
    .catch(e => {
      debugger;
      throw e;
    });
};

export const getCurrentStatus = (macAddress: MacAddress): Promise<StatusInfo> =>
  fetch(
    addParamsToUrl(`${hermioneUrl()}/get_current_status`, { mac: macAddress })
  ).then(response => response.json());
