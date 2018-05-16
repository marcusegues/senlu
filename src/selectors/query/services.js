// @flow
import type { ServicesState } from '../../types/reducers/query/services';
import type { IsFetching, Services } from '../../types/reducers/query';

export const getFetchingServices = (state: ServicesState): IsFetching =>
  state.fetchingServices;
export const getServices = (state: ServicesState): Services => state.services;
