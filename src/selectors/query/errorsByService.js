// errorsByService
export const getFetchingErrorsByService = state =>
  state.fetchingErrorsByService;

export const getErrorsByService = state => state.errorsByService;

export const getError = (state, serviceId, idx) =>
  state.errorsByService[serviceId][idx];
