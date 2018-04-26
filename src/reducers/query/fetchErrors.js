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
    case 'SET_ERROR_FETCH_MAC_ADDRESS': {
      return {
        ...state,
        errorFetchMacAddress: action.error,
      };
    }
    case 'RESET_ERROR_FETCH_MAC_ADDRESS': {
      return {
        ...state,
        errorFetchMacAddress: null,
      };
    }
    case 'SET_ERROR_FETCH_SERVICES': {
      return {
        ...state,
        errorFetchServices: action.error,
      };
    }
    case 'RESET_ERROR_FETCH_SERVICES': {
      return {
        ...state,
        errorFetchServices: null,
      };
    }
    case 'SET_ERROR_FETCH_ERRORS_BY_SERVICE': {
      return {
        ...state,
        errorFetchErrorsByService: action.error,
      };
    }
    case 'RESET_ERROR_FETCH_ERRORS_BY_SERVICE': {
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
