// @flow
import type { ParametersState } from '../../types/reducers/query/parameters';

var moment = require('moment');

const initialState: ParametersState = {
  timeSpanStart: { date: moment().format('YYYY-MM-DD'), time: '00:00' },
  timeSpanEnd: { date: moment().format('YYYY-MM-DD'), time: '22:00' },
  customerId: '',
  macAddress: '',
  fetchingMacAddress: false,
  sessionId: '',
  accessToken: '',
};

export const parameters = (
  state: ParametersState = initialState,
  action: any
) => {
  switch (action.type) {
    case 'SET_CUSTOMER_ID': {
      return {
        ...state,
        customerId: action.customerId,
      };
    }
    case 'SET_MAC_ADDRESS': {
      return {
        ...state,
        macAddress: action.macAddress,
      };
    }
    case 'SET_FETCHING_MAC_ADDRESS': {
      return {
        ...state,
        fetchingMacAddress: action.fetching,
      };
    }
    case 'SET_SESSION_ID': {
      return {
        ...state,
        sessionId: action.sessionId,
      };
    }
    case 'SET_ACCESS_TOKEN': {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    case 'SET_TIMESPAN_START': {
      return {
        ...state,
        timeSpanStart: action.timeSpanStart,
      };
    }
    case 'SET_TIMESPAN_END': {
      return {
        ...state,
        timeSpanEnd: action.timeSpanEnd,
      };
    }

    default: {
      return state;
    }
  }
};
