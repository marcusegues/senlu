// @flow
import { combineReducers } from 'redux';
import { api } from './api';
/**
 * Combines reducers
 * @type {Reducer<any>}
 */
export const root: AppState = combineReducers({
    api
});
