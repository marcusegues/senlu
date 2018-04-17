// @flow
import { addParamsToUrl } from './utils';

export type DumbledoreApi = Promise<?Object>;

export const userServices = (): DumbledoreApi =>
  fetch('https://dumbledore-dot-ql-sen-stag.appspot.com/userServices').then(
    response => response.json()
  );

export const customerDegradationByCustomerId = (
  customerId,
  sessionId,
  timePeriod
): DumbledoreApi =>
  fetch(
    addParamsToUrl(
      'https://dumbledore-dot-ql-sen-stag.appspot.com/customerDegradation',
      {
        customer_id: customerId,
        session_id: sessionId,
        time_period: timePeriod,
      }
    )
  ).then(response => response.json());

export const selectCustomerDegradation = (
  customerId,
  sessionId,
  timespanStart,
  timespanEnd,
  userService,
  errorCode
): DumbledoreApi =>
  fetch('https://dumbledore-dot-ql-sen-stag.appspot.com/customerDegradation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer_id: customerId,
      session_id: sessionId,
      time_start: timespanStart,
      time_end: timespanEnd,
      user_service: userService,
      error_code: errorCode,
    }),
  })
    // eslint-disable-next-line no-console
    .catch(e => {
      console.log('Error', e);
      return null;
    });
