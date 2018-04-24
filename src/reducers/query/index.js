// @flow
import { combineReducers } from 'redux';
import { hermione } from './hermione';
import { dumbledore } from './dumbledore';
import { parameters } from './parameters';
import type { QueryState } from '../../types/reducers/query';

export const query: QueryState = combineReducers({
  parameters,
  hermione,
  dumbledore,
});
