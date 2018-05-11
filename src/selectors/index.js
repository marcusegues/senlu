import * as queryApi from './query';

// query.parameters
export const getCustomerId = state => queryApi.getCustomerId(state.query);
export const getMacAddress = state => queryApi.getMacAddress(state.query);
export const getSessionId = state => queryApi.getSessionId(state.query);
export const getTimeSpanStart = state => queryApi.getTimeSpanStart(state.query);
export const getTimeSpanEnd = state => queryApi.getTimeSpanEnd(state.query);

// query.errorsByService
export const getFetchingErrorsByService = state =>
  queryApi.getFetchingErrorsByService(state.query);

export const getErrorsByService = state =>
  queryApi.getErrorsByService(state.query);

export const getError = (state, serviceId, idx) =>
  queryApi.getError(state.query, serviceId, idx);

export const getDegradationNameById = (state, id) =>
  queryApi.getDegradationNameById(state.query, id);

// query.services
export const getFetchingServices = state =>
  queryApi.getFetchingServices(state.query);

export const getServices = state => queryApi.getServices(state.query);

// query.fetchErrors
export const getErrorFetchMacAddress = state =>
  queryApi.getErrorFetchMacAddress(state.query);

export const getErrorFetchErrorsByService = state =>
  queryApi.getErrorFetchErrorsByService(state.query);

export const getErrorFetchServices = state =>
  queryApi.getErrorFetchServices(state.query);

// query.statusInfo
export const getFetchingStatusInfo = state =>
  queryApi.getFetchingStatusInfo(state.query);
