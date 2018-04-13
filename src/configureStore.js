// @flow
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { root } from './reducers';

export const configureStore = () =>
  createStore(root, applyMiddleware(thunkMiddleware));
