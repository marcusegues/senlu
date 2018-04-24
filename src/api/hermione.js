import { addParamsToUrl } from './utils';

export const getDegradationsByCustomerId = (
  customerId,
  timeSpanStart,
  timeSpanEnd
) =>
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
    console.log('Hermione response is', response);
    return response.json();
  });

export const getDegradationsByMac = (mac, timeSpanStart, timeSpanEnd) => {
  const macNoDots = mac.toString().replace(/\./g, '');
  return fetch(
    addParamsToUrl(
      'https://hermione-dot-ql-sen-stag.appspot.com/get_degradations',
      {
        mac: macNoDots,
        timespan_start: timeSpanStart,
        timespan_end: timeSpanEnd,
      }
    )
  ).then(response => response.json());
};
