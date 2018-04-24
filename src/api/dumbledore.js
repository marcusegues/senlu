// @flow
import type {
  CustomerId,
  ErrorCode,
  SessionId,
  TimeSpanDelimiter,
  UserService,
} from '../types/reducers/query';

export type DumbledoreApi = Promise<?Object>;

export const allUserServices = (): DumbledoreApi =>
  fetch('https://dumbledore-dot-ql-sen-stag.appspot.com/userServices').then(
    response => response.json()
  );

export const userServices = (customerId: CustomerId): DumbledoreApi =>
  fetch(
    `https://dumbledore-dot-ql-sen-stag.appspot.com/userServices/${customerId}`
  ).then(response => {
    // eslint-disable-next-line no-console
    console.log('Dumbledore response', response);
    return response.json();
  });

// export const customerDegradationByCustomerId = (
//   customerId: CustomerId,
//   sessionId: SessionId,
//   timePeriod
// ): DumbledoreApi =>
//   fetch(
//     addParamsToUrl(
//       'https://dumbledore-dot-ql-sen-stag.appspot.com/customerDegradation',
//       {
//         customer_id: customerId,
//         session_id: sessionId,
//         time_period: timePeriod,
//       }
//     )
//   ).then(response => response.json());

export const selectCustomerDegradation = (
  customerId: CustomerId,
  sessionId: SessionId,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  userService: UserService,
  errorCode: ErrorCode
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
      user_service: userService,
      error_code: errorCode,
    }),
  }).catch(e => {
    // eslint-disable-next-line no-console
    console.log('Error', e);
    return null;
  });
