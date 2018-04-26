// @flow
import { combineReducers } from 'redux';
import { errorsByService } from './errorsByService';
import { services } from './services';
import { parameters } from './parameters';
import type { QueryState } from '../../types/reducers/query';

export const query: QueryState = combineReducers({
  parameters,
  errorsByService,
  services,
});
