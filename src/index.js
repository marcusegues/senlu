// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';
import { configureStore } from './configureStore';
import type { Store } from './types';

const store: Store = configureStore();
const root = document.getElementById('root');
if (root !== null) {
  // flowcheck
  ReactDOM.render(<Root store={store} />, root);
}
registerServiceWorker();
