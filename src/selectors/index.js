// @flow
import * as queryApi from './query';
import type { AppState, Index, ServiceId } from '../types/reducers';
import type {
  CustomerId,
  MacAddress,
  SessionId,
  TimeSpanDelimiter,
} from '../types/reducers/query';

// query.parameters
export const getCustomerId = (state: AppState): CustomerId =>
  queryApi.getCustomerId(state.query);
export const getMacAddress = (state: AppState): MacAddress =>
  queryApi.getMacAddress(state.query);
export const getSessionId = (state: AppState): SessionId =>
  queryApi.getSessionId(state.query);
export const getTimeSpanStart = (state: AppState): TimeSpanDelimiter =>
  queryApi.getTimeSpanStart(state.query);
export const getTimeSpanEnd = (state: AppState): TimeSpanDelimiter =>
  queryApi.getTimeSpanEnd(state.query);

// query.degradationsByService
export const getFetchingFrontendDegradationsByService = (state: AppState) =>
  queryApi.getFetchingFrontendDegradationsByService(state.query);

export const getFetchingBackendDegradationsByService = (state: AppState) =>
  queryApi.getFetchingBackendDegradationsByService(state.query);

export const getFrontendDegradationsByService = (state: AppState) =>
  queryApi.getFrontendDegradationsByService(state.query);

export const getDegradation = (
  state: AppState,
  serviceId: ServiceId,
  idx: Index
) => queryApi.getDegradation(state.query, serviceId, idx);

export const getDegradationNameById = (state: AppState, idx: Index) =>
  queryApi.getDegradationNameById(state.query, idx);

// query.services
export const getFetchingServices = (state: AppState) =>
  queryApi.getFetchingServices(state.query);

export const getServices = (state: AppState) =>
  queryApi.getServices(state.query);

// query.fetchErrors
export const getErrorFetchMacAddress = (state: AppState) =>
  queryApi.getErrorFetchMacAddress(state.query);

export const getErrorFetchErrorsByService = (state: AppState) =>
  queryApi.getErrorFetchErrorsByService(state.query);

export const getErrorFetchServices = (state: AppState) =>
  queryApi.getErrorFetchServices(state.query);

// query.statusInfo
export const getFetchingStatusInfo = (state: AppState) =>
  queryApi.getFetchingStatusInfo(state.query);
