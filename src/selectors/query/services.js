// @flow
import type { ServicesState } from '../../types/reducers/query/services';
import type { Fetching, Services } from '../../types/reducers/query';

export const getFetchingServices = (state: ServicesState): Fetching =>
  state.fetchingServices;
export const getServices = (state: ServicesState): Services => state.services;
