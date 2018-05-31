// @flow
import type { IsFetching, Services } from './index';

export type ServicesState = {
  fetchingServices: IsFetching,
  services: Services,
};

export const initialServices = {};
