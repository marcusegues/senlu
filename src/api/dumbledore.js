// @flow
import type {
  CustomerId,
  SessionId,
  TimeSpanDelimiter,
  DegradationName,
  DegradationNames,
  Services,
} from '../types/reducers/query';
import type { Id } from '../types/reducers';

export const getDegradationNames = (): Promise<DegradationNames> =>
  fetch(`https://dumbledore-dot-ql-sen-stag.appspot.com/errorCode/`).then(
    response => {
      // eslint-disable-next-line no-console
      console.log('Dumbledore response', response);
      if (response.status !== 200) {
        throw new Error('Error obtaining user services.');
      }
      return response.json();
    }
  );

export const userServices = (): Promise<Services> =>
  fetch(`https://dumbledore-dot-ql-sen-stag.appspot.com/userService`).then(
    response => {
      // eslint-disable-next-line no-console
      console.log('Dumbledore response', response);
      if (response.status !== 200) {
        throw new Error('Error obtaining user services.');
      }
      return response.json();
    }
  );

export const getMacAddressByCustomerId = (
  customerId: CustomerId,
  accessToken: number = 123
): Promise<{ device_address: string }> =>
  fetch(
    `https://dumbledore-dot-ql-sen-stag.appspot.com/deviceAddress/${
      customerId
    }/${accessToken}`
  ).then(response => {
    // eslint-disable-next-line no-console
    console.log('Dumbledore response device mac', response);
    if (response.status !== 200) {
      throw new Error('Error obtaining MAC address.');
    }
    return response.json();
  });

export const selectCustomerDegradation = (
  customerId: CustomerId,
  sessionId: SessionId,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  serviceId: Id,
  degradation: DegradationName,
  selected: boolean
): Promise<Object> =>
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
      user_service: serviceId,
      error_code: degradation,
      selected,
    }),
  }).catch(e => {
    // eslint-disable-next-line no-console
    console.log('Error selecting customer degradation.', e);
    throw e;
  });
