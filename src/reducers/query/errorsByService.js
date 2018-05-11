// @flow
import type { ErrorsByServiceState } from '../../types/reducers/query/errorsByService';
import {
  initialErrorsByService,
  initialSelectedDegradation,
} from '../../types/reducers/query/errorsByService';

const initialState: ErrorsByServiceState = {
  fetchingErrorsByService: false,
  errorsByService: initialErrorsByService,
  fetchingDegradationNames: false,
  degradationNames: [],
  selectedDegradation: initialSelectedDegradation,
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
    case 'SET_FETCHING_DEGRADATION_NAMES': {
      return {
        ...state,
        fetchingDegradationNames: action.fetching,
      };
    }
    case 'SET_ERRORS_BY_SERVICE': {
      return {
        ...state,
        errorsByService: action.data,
      };
    }
    case 'SET_DEGRADATION_NAMES': {
      return {
        ...state,
        degradationNames: action.data,
      };
    }
    case 'SET_SELECTED_DEGRADATION': {
      return {
        ...state,
        selectedDegradation: action.selectedDegradation,
      };
    }
    default: {
      return state;
    }
  }
};
