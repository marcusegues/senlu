// @flow
import type Moment from 'moment';
import type { ParametersState } from '../../types/reducers/query/parameters';
import type { Action } from '../../types/actions/actions';

const moment = require('moment');

const now: Moment = moment();
const nowMinusOneDay: Moment = moment(now).subtract(1, 'day');

const initialState: ParametersState = {
  timeSpanStart: {
    date: nowMinusOneDay.format('YYYY-MM-DD'),
    time: nowMinusOneDay.format('HH:mm:ss'),
  },
  timeSpanEnd: {
    date: now.format('YYYY-MM-DD'),
    time: now.format('HH:mm:ss'),
  },
  customerId: '',
  macAddress: '',
  fetchingMacAddress: false,
  sessionId: '',
  accessToken: '',
};

export const parameters = (
  state: ParametersState = initialState,
  action: Action
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
