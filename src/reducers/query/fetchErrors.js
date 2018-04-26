// @flow
import type { FetchErrorsState } from '../../types/reducers/query/fetchErrors';

const initialState: FetchErrorsState = {
  errorFetchMacAddress: null,
  errorFetchServices: null,
  errorFetchErrorsByService: null,
};

export const fetchErrors = (
  state: FetchErrorsState = initialState,
  action: any
) => {
  switch (action.type) {
    case 'SET_FETCH_MAC_ADDRESS_ERROR': {
      return {
        ...state,
        errorFetchMacAddress: action.error,
      };
    }
    case 'RESET_FETCH_MAC_ADDRESS_ERROR': {
      return {
        ...state,
        errorFetchMacAddress: null,
      };
    }
    case 'SET_FETCH_SERVICES_ERROR': {
      return {
        ...state,
        errorFetchServices: action.error,
      };
    }
    case 'RESET_FETCH_SERVICES_ERROR': {
      return {
        ...state,
        errorFetchServices: null,
      };
    }
    case 'SET_FETCH_ERRORS_BY_SERVICE_ERROR': {
      return {
        ...state,
        errorFetchErrorsByService: action.error,
      };
    }
    case 'RESET_FETCH_ERRORS_BY_SERVICE_ERROR': {
      return {
        ...state,
        errorFetchErrorsByService: null,
      };
    }
    default: {
      return state;
    }
  }
};
