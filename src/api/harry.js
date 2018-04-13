export const listErrors = () =>
  fetch('https://harry-dot-ql-sen-stag.appspot.com/list_errors').then(
    response => response.json()
  );

export const getError = id =>
  fetch('https://harry-dot-ql-sen-stag.appspot.com/get_error', {
    method: 'POST',
    body: new URLSearchParams(`id=${id}`),
  })
    .then(response => response.json())
    // eslint-disable-next-line no-console
    .catch(e => console.log('Error', e));

export const getDeviceDegradations = () =>
  fetch(
    'https://harry-dot-ql-sen-stag.appspot.com/get_device_degradations?cpeid=943BB1656794'
  ).then(response => response.json());
