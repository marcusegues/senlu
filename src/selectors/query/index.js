import * as parametersApi from './parameters';
import * as hermioneApi from './hermione';
import * as dumbledoreApi from './dumbledore';

// parameters
export const getCustomerId = state =>
  parametersApi.getCustomerId(state.parameters);
export const getSessionId = state =>
  parametersApi.getSessionId(state.parameters);
export const getTimeSpanStart = state =>
  parametersApi.getTimeSpanStart(state.parameters);
export const getTimeSpanEnd = state =>
  parametersApi.getTimeSpanEnd(state.parameters);

// hermione
export const getFetchingErrorsByService = state =>
  hermioneApi.getFetchingErrorsByService(state.hermione);
export const getErrorsByService = state =>
  hermioneApi.getErrorsByService(state.hermione);

// dumbledore
export const getFetchingUserServices = state =>
  dumbledoreApi.getFetchingUserServices(state.dumbledore);
export const getUserServices = state =>
  dumbledoreApi.getUserServices(state.dumbledore);
