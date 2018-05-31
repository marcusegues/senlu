// @flow
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { root } from './reducers';
import type { Store } from './types';

export const configureStore = (): Store =>
  createStore(root, applyMiddleware(thunkMiddleware));
