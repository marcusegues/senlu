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
  ).then(response => {
    console.log('Hermione response', response);
    return response.json();
  });

export const getDegradationsByMac = (mac, timespanStart, timespanEnd) =>
  fetch(
    addParamsToUrl(
      'https://hermione-dot-ql-sen-stag.appspot.com/get_degradations',
      {
        mac,
        timespan_start: timespanStart,
        timespan_end: timespanEnd,
      }
    )
  ).then(response => {
    console.log('Hermione response', response);
    return response.json();
  });

