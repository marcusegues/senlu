import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';
import { getError, listErrors } from './api/harry';

listErrors().then(data => {
  console.log(data);
  return getError(Object.keys(data)[0]);
});
// .then(response => console.log(response));

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
