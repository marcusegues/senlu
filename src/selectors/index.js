import * as queryApi from './query';

// query
export const getCustomerId = state => queryApi.getCustomerId(state.query);
export const getSessionId = state => queryApi.getSessionId(state.query);
export const getTimeSpanStart = state => queryApi.getTimeSpanStart(state.query);
export const getTimeSpanEnd = state => queryApi.getTimeSpanEnd(state.query);
export const getFetchingErrorsByService = state =>
  queryApi.getFetchingErrorsByService(state.query);
export const getErrorsByService = state =>
  queryApi.getErrorsByService(state.query);
export const getFetchingUserServices = state =>
  queryApi.getFetchingUserServices(state.query);
export const getUserServices = state => queryApi.getUserServices(state.query);
