import * as parametersApi from './parameters';
import * as errorsByServiceApi from './errorsByService';
import * as servicesApi from './services';
import * as fetchErrorsApi from './fetchErrors';

// parameters
export const getCustomerId = state =>
  parametersApi.getCustomerId(state.parameters);
export const getMacAddress = state =>
  parametersApi.getMacAddress(state.parameters);
export const getSessionId = state =>
  parametersApi.getSessionId(state.parameters);
export const getTimeSpanStart = state =>
  parametersApi.getTimeSpanStart(state.parameters);
export const getTimeSpanEnd = state =>
  parametersApi.getTimeSpanEnd(state.parameters);

// errorsByService
export const getFetchingErrorsByService = state =>
  errorsByServiceApi.getFetchingErrorsByService(state.errorsByService);

export const getErrorsByService = state =>
  errorsByServiceApi.getErrorsByService(state.errorsByService);

export const getError = (state, serviceId, idx) =>
  errorsByServiceApi.getError(state.errorsByService, serviceId, idx);

// services
export const getFetchingServices = state =>
  servicesApi.getFetchingServices(state.services);
export const getServices = state => servicesApi.getServices(state.services);

// fetchErrors
export const getErrorFetchMacAddress = state =>
  fetchErrorsApi.getErrorFetchMacAddress(state.fetchErrors);

export const getErrorFetchErrorsByService = state =>
  fetchErrorsApi.getErrorFetchErrorsByService(state.fetchErrors);

export const getErrorFetchServices = state =>
  fetchErrorsApi.getErrorFetchServices(state.fetchErrors);
