// @flow
import { combineReducers } from 'redux';
import { degradationsByService } from './degradationsByService';
import { fetchErrors } from './fetchErrors';
import { services } from './services';
import { parameters } from './parameters';
import { statusInfo } from './statusInfo';
import type { QueryState } from '../../types/reducers/query';

export const query: QueryState = combineReducers({
  parameters,
  degradationsByService,
  services,
  fetchErrors,
  statusInfo,
});
