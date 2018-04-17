// @flow
import { combineReducers } from 'redux';
import { api } from './api';
import { AppState } from '../types/reducers';
/**
 * Combines reducers
 * @type {Reducer<any>}
 */
export const root: AppState = combineReducers({
  api,
});
