// @flow
import type { DegradationsByServiceState } from '../../types/reducers/query/degradationsByService';
import {
  initialDegradationsByService,
  initialSelectedDegradation,
} from '../../types/reducers/query/degradationsByService';
import type { Action } from '../../types/actions/actions';
import { initialDegradationNames } from '../../types/reducers/query';

const initialState: DegradationsByServiceState = {
  fetchingFrontendDegradationsByService: false,
  fetchingBackendDegradationsByService: false,
  frontendDegradationsByService: initialDegradationsByService,
  backendDegradationsByService: initialDegradationsByService,
  fetchingDegradationNames: false,
  degradationNames: initialDegradationNames,
  selectedDegradation: initialSelectedDegradation,
};

export const degradationsByService = (
  state: DegradationsByServiceState = initialState,
  action: Action
) => {
  switch (action.type) {
    case 'SET_FETCHING_FRONTEND_DEGRADATIONS_BY_SERVICE': {
      return {
        ...state,
        fetchingFrontendDegradationsByService: action.fetching,
      };
    }
    case 'SET_FETCHING_BACKEND_DEGRADATIONS_BY_SERVICE': {
      return {
        ...state,
        fetchingBackendDegradationsByService: action.fetching,
      };
    }
    case 'SET_FETCHING_DEGRADATION_NAMES': {
      return {
        ...state,
        fetchingDegradationNames: action.fetching,
      };
    }
    case 'SET_FRONTEND_DEGRADATIONS_BY_SERVICE': {
      return {
        ...state,
        frontendDegradationsByService: action.data,
      };
    }
    case 'SET_BACKEND_DEGRADATIONS_BY_SERVICE': {
      return {
        ...state,
        backendDegradationsByService: action.data,
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
