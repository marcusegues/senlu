// @flow
import * as parametersApi from './parameters';
import * as errorsByServiceApi from './errorsByService';
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
export const getFetchingErrorsByService = (state: QueryState): IsFetching =>
  errorsByServiceApi.getFetchingErrorsByService(state.errorsByService);

export const getErrorsByService = (state: QueryState): DegradationsByService =>
  errorsByServiceApi.getErrorsByService(state.errorsByService);

export const getError = (
  state: QueryState,
  serviceId: ServiceId,
  idx: Index
): Degradation =>
  errorsByServiceApi.getError(state.errorsByService, serviceId, idx);

export const getDegradationNameById = (
  state: QueryState,
  idx: Index
): DegradationName =>
  errorsByServiceApi.getDegradationNameById(state.errorsByService, idx);

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
