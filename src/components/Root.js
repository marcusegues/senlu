// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { App } from './App';
import type { Store } from '../types';

const Root = ({ store }: { store: Store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
