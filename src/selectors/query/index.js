// @flow
import * as parametersApi from './parameters';
import * as degradationsByServiceApi from './degradationsByService';
import * as servicesApi from './services';
import * as fetchErrorsApi from './fetchErrors';
import * as statusInfoApi from './statusInfo';
import type {
  CustomerId,
  Degradation,
  DegradationName,
  DegradationsByService,
  IsFetching,
  MacAddress,
  QueryState,
  Services,
  SessionId,
  TimeSpanDelimiter,
} from '../../types/reducers/query';
import type { Index, ServiceId } from '../../types/reducers';
import type { FetchError } from '../../types/reducers/query/fetchErrors';

// parameters
export const getCustomerId = (state: QueryState): CustomerId =>
  parametersApi.getCustomerId(state.parameters);
export const getMacAddress = (state: QueryState): MacAddress =>
  parametersApi.getMacAddress(state.parameters);
export const getSessionId = (state: QueryState): SessionId =>
  parametersApi.getSessionId(state.parameters);
export const getTimeSpanStart = (state: QueryState): TimeSpanDelimiter =>
  parametersApi.getTimeSpanStart(state.parameters);
export const getTimeSpanEnd = (state: QueryState): TimeSpanDelimiter =>
  parametersApi.getTimeSpanEnd(state.parameters);

// errorsByService
export const getFetchingFrontendDegradationsByService = (state: QueryState): IsFetching =>
  degradationsByServiceApi.getFetchingFrontendDegradationsByService(state.degradationsByService);

export const getFrontendDegradationsByService = (state: QueryState): DegradationsByService =>
  degradationsByServiceApi.getFrontendDegradationsByService(state.degradationsByService);

export const getDegradation = (
  state: QueryState,
  serviceId: ServiceId,
  idx: Index
): Degradation =>
  degradationsByServiceApi.getDegradation(state.degradationsByService, serviceId, idx);

export const getDegradationNameById = (
  state: QueryState,
  idx: Index
): DegradationName =>
  degradationsByServiceApi.getDegradationNameById(state.degradationsByService, idx);

// services
export const getFetchingServices = (state: QueryState): IsFetching =>
  servicesApi.getFetchingServices(state.services);
export const getServices = (state: QueryState): Services =>
  servicesApi.getServices(state.services);

// fetchErrors
export const getErrorFetchMacAddress = (state: QueryState): FetchError =>
  fetchErrorsApi.getErrorFetchMacAddress(state.fetchErrors);

export const getErrorFetchErrorsByService = (state: QueryState): FetchError =>
  fetchErrorsApi.getErrorFetchErrorsByService(state.fetchErrors);

export const getErrorFetchServices = (state: QueryState): FetchError =>
  fetchErrorsApi.getErrorFetchServices(state.fetchErrors);

// query.statusInfo
export const getFetchingStatusInfo = (state: QueryState): IsFetching =>
  statusInfoApi.getFetchingStatusInfo(state.statusInfo);
