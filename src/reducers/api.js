// @flow
import type { ApiState } from '../types/reducers/api';
import { formatServiceName } from '../utils';

const initialState: ApiState = {
  timespanStart: { date: '2018-02-27', time: '00:00' },
  timespanEnd: { date: '2018-02-27', time: '22:00' },
  customerId: 100360253,
  sessionId: 1130344,
  fetchingHermione: false,
  fetchingDumbledore: false,
  hermioneErrorsByService: {},
  dumbledoreUserServices: [],
};

export const api = (state: ApiState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_TIMESPAN_START': {
      return {
        ...state,
        timespanStart: action.timespanStart,
      };
    }
    case 'SET_TIMESPAN_END': {
      return {
        ...state,
        timespanEnd: action.timespanEnd,
      };
    }
    case 'SET_CUSTOMER_ID': {
      return {
        ...state,
        customerId: action.customerId,
      };
    }
    case 'SET_SESSION_ID': {
      return {
        ...state,
        sessionId: action.sessionId,
      };
    }

    case 'SET_FETCHING_HERMIONE': {
      return {
        ...state,
        fetchingHermione: action.fetching,
      };
    }
    case 'SET_HERMIONE_ERRORS_BY_SERVICE': {
      return {
        ...state,
        hermioneErrorsByService: action.data,
      };
    }
    case 'SET_DUMBLEDORE_USER_SERVICES': {
      return {
        ...state,
        dumbledoreUserServices: action.data.map(formatServiceName),
      };
    }
    default: {
      return state;
    }
  }
};
