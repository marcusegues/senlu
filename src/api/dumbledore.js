import { addParamsToUrl } from './utils';

export const userServices = () =>
  fetch('https://dumbledore-dot-ql-sen-stag.appspot.com/userServices').then(
    response => response.json()
  );

export const customerDegradationByCustomerId = (
  customerId,
  sessionId,
  timePeriod
) =>
  fetch(
    addParamsToUrl(
      'https://dumbledore-dot-ql-sen-stag.appspot.com/customerDegradation',
      {
        customer_id: customerId,
        session_id: sessionId,
        time_period: timePeriod,
      }
    )
  ).then(response => {
    return response.json();
  });

export const selectCustomerDegradation = (
  customerId,
  sessionId,
  timePeriod,
  userService,
  errorCode
) =>
  fetch('https://dumbledore-dot-ql-sen-stag.appspot.com/customerDegradation', {
    method: 'POST',
    body: JSON.stringify({
      customer_id: customerId,
      session_id: sessionId,
      time_period: timePeriod,
      user_service: userService,
      error_code: errorCode,
    }),
  })
    .then(response => {
      // response.json();
    })
    // eslint-disable-next-line no-console
    .catch(e => console.log('Error', e));
