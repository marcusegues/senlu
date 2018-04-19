import { addParamsToUrl } from './utils';

export const getDegradationsByCustomerId = (
  customerId,
  timespanStart,
  timespanEnd
) =>
  fetch(
    addParamsToUrl(
      'https://hermione-dot-ql-sen-stag.appspot.com/get_degradations',
      {
        customer_id: customerId,
        timespan_start: timespanStart,
        timespan_end: timespanEnd,
      }
    )
  ).then(response => response.json());

export const getDegradationsByMac = (mac, timespanStart, timespanEnd) => {
  const macNoDots = mac.toString().replace(/\./g, '');
  return fetch(
    addParamsToUrl(
      'https://hermione-dot-ql-sen-stag.appspot.com/get_degradations',
      {
        mac: macNoDots,
        timespan_start: timespanStart,
        timespan_end: timespanEnd,
      }
    )
  ).then(response => response.json());
};
