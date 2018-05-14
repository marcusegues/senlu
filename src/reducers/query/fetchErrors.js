// @flow
import type { FetchErrorsState } from '../../types/reducers/query/fetchErrors';
import type { Action } from '../../types/actions/actions';

const initialState: FetchErrorsState = {
  errorFetchMacAddress: null,
  errorFetchServices: null,
  errorFetchErrorsByService: null,
};

export const fetchErrors = (
  state: FetchErrorsState = initialState,
  action: Action
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
    case 'SET_ERROR_MISSING_CUSTOMER_ID': {
      return {
        ...state,
        errorMissingCustomerId: action.error,
      };
    }
    case 'RESET_ERROR_MISSING_CUSTOMER_ID': {
      return {
        ...state,
        errorMissingCustomerId: null,
      };
    }
    case 'SET_ERROR_MISSING_SESSION_ID': {
      return {
        ...state,
        errorMissingSessionId: action.error,
      };
    }

    case 'SET_ERROR_MISSING_ACCESS_TOKEN': {
      return {
        ...state,
        errorMissingAccessToken: action.error,
      };
    }

    default: {
      return state;
    }
  }
};
