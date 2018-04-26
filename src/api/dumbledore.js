// @flow
import type {
  CustomerId,
  MacAddress,
  SessionId,
  TimeSpanDelimiter,
  Service,
  Degradation,
} from '../types/reducers/query';

export type DumbledoreApi = Promise<?Object>;

export const allUserServices = (): DumbledoreApi =>
  fetch('https://dumbledore-dot-ql-sen-stag.appspot.com/userServices').then(
    response => response.json()
  );

export const userServices = (macAddress: MacAddress): DumbledoreApi =>
  fetch(
    `https://dumbledore-dot-ql-sen-stag.appspot.com/userServices/${macAddress}`
  ).then(response => {
    // eslint-disable-next-line no-console
    console.log('Dumbledore response', response);
    return response.json();
  });

export const getMacAddressByCustomerId = (
  customerId: CustomerId
): DumbledoreApi =>
  fetch(
    `https://dumbledore-dot-ql-sen-stag.appspot.com/deviceAddress/${customerId}`
  ).then(response => {
    // eslint-disable-next-line no-console
    console.log('Dumbledore response device mac', response);
    if (response.status !== 200) {
      throw new Error('Invalid response');
    }

    return response.json();
  });

export const selectCustomerDegradation = (
  customerId: CustomerId,
  sessionId: SessionId,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  service: Service,
  degradation: Degradation
): DumbledoreApi =>
  fetch('https://dumbledore-dot-ql-sen-stag.appspot.com/customerDegradation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer_id: customerId,
      session_id: sessionId,
      time_start: `${timeSpanStart.date} ${timeSpanStart.time}`,
      time_end: `${timeSpanEnd.date} ${timeSpanEnd.time}`,
      user_service: service,
      error_code: degradation,
    }),
  }).catch(e => {
    // eslint-disable-next-line no-console
    console.log('Error', e);
    return null;
  });
