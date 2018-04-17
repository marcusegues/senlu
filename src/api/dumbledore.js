// @flow
import type {
  CustomerId,
  ErrorCode,
  SessionId,
  TimespanDelimiter,
} from '../types/api';
import type { UserService } from '../types';

export type DumbledoreApi = Promise<?Object>;

export const allUserServices = (): DumbledoreApi =>
  fetch('https://dumbledore-dot-ql-sen-stag.appspot.com/userServices').then(
    response => response.json()
  );

export const userServices = (customerId: CustomerId): DumbledoreApi =>
  fetch(
    `https://dumbledore-dot-ql-sen-stag.appspot.com/userServices/${customerId}`
  ).then(response => response.json());

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
  timespanStart: TimespanDelimiter,
  timespanEnd: TimespanDelimiter,
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
      time_start: `${timespanStart.date} ${timespanStart.time}`,
      time_end: `${timespanEnd.date} ${timespanEnd.time}`,
      user_service: userService,
      error_code: errorCode,
    }),
  }).catch(e => {
    // eslint-disable-next-line no-console
    console.log('Error', e);
    return null;
  });
