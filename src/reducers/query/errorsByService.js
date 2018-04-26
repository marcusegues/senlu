// @flow
import type { ErrorsByServiceState } from '../../types/reducers/query/errorsByService';

const initialState: ErrorsByServiceState = {
  fetchingErrorsByService: false,
  errorsByService: {},
};

export const errorsByService = (
  state: ErrorsByServiceState = initialState,
  action: any
) => {
  switch (action.type) {
    case 'SET_FETCHING_ERRORS_BY_SERVICE': {
      return {
        ...state,
        fetchingErrorsByService: action.fetching,
      };
    }
    case 'SET_ERRORS_BY_SERVICE': {
      return {
        ...state,
        errorsByService: action.data,
      };
    }

    default: {
      return state;
    }
  }
};
