// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { root } from './reducers';
import type { Store } from './types';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (): Store =>
  createStore(
    root,
    /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware))
  );
