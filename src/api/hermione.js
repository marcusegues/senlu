// @flow
import { addParamsToUrl, removeDotsFromMacAddress } from './utils';
import type {
  CustomerId,
  DegradationName,
  DegradationsByService,
  MacAddress,
  TimeSpanDelimiter,
} from '../types/reducers/query';
import { StatusInfo } from '../components/StatusInfo/StatusInfo';

export const getDegradationsByCustomerId = (
  customerId: CustomerId,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter
): Promise<DegradationsByService> =>
  fetch(
    addParamsToUrl(
      'https://hermione-dot-ql-sen-stag.appspot.com/get_degradations',
      {
        customer_id: customerId,
        timespan_start: timeSpanStart,
        timespan_end: timeSpanEnd,
      }
    )
  ).then(response => {
    // eslint-disable-next-line no-console
    console.log('Hermione response is', response);
    return response.json();
  });

export const getDegradationsByMac = (
  macAddress: MacAddress,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter
): Promise<DegradationsByService> => {
  const macNoDots = removeDotsFromMacAddress(macAddress);
  return fetch(
    addParamsToUrl(
      'https://hermione-dot-ql-sen-stag.appspot.com/get_degradations',
      {
        mac: macNoDots,
        timespan_start: timeSpanStart,
        timespan_end: timeSpanEnd,
      }
    )
  ).then(response => {
    // eslint-disable-next-line no-console
    console.log('Hermione response is', response);
    return response.json();
  });
};

export const getCurrentStatus = (macAddress: MacAddress): Promise<StatusInfo> =>
  fetch(
    addParamsToUrl(
      'https://hermione-dot-ql-sen-stag.appspot.com/get_current_status',
      { mac: macAddress }
    )
  ).then(response => response.json());
