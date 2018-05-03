// @flow
import type { ParametersState } from '../../types/reducers/query/parameters';

const initialState: ParametersState = {
  timeSpanStart: { date: '2018-02-27', time: '00:00' },
  timeSpanEnd: { date: '2018-02-27', time: '22:00' },
  customerId: '',
  macAddress: '3ACFC5000020',
  sessionId: '',
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
    case 'SET_SESSION_ID': {
      return {
        ...state,
        sessionId: action.sessionId,
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
