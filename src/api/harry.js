export const listErrors = () =>
  fetch('https://harry-dot-ql-sen-stag.appspot.com/list_errors').then(
    response => response.json()
  );

export const getError = id =>
  fetch('https://harry-dot-ql-sen-stag.appspot.com/get_error', {
    method: 'POST',
    body: JSON.stringify({ id: '1eb37a11-b239-416f-b11c-31c873518eb0' }),
  })
    .then(response => {
      response.json();
    })
    .then(data => console.log('data is', data));
