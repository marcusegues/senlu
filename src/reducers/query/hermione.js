// @flow
import type { HermioneState } from '../../types/reducers/query/hermione';

const initialState: HermioneState = {
  fetchingErrorsByService: false,
  errorsByService: {},
};

export const hermione = (state: HermioneState = initialState, action: any) => {
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
