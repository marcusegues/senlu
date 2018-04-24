// @flow
import { combineReducers } from 'redux';
import { query } from './query';
import type { AppState } from '../types/reducers';
/**
 * Combines reducers
 * @type {Reducer<any>}
 */
export const root: AppState = combineReducers({
  query,
});
