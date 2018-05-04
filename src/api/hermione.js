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
    // eslint-disable-next-line no-console
    console.log('Hermione response is', response);
    return response.json();
  });

export const getDegradationsByMac = (
  macAddress,
  timeSpanStart,
  timeSpanEnd
) => {
  const macNoDots = macAddress.toString().replace(/\./g, '');
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

export const getCurrentStatus = macAddress => {
  return fetch(
    addParamsToUrl(
      'https://hermione-dot-ql-sen-stag.appspot.com/get_current_status',
      { mac: macAddress }
    )
  ).then(response => {
    console.log('Get current status response', response);
    return response.json();
  });
};
