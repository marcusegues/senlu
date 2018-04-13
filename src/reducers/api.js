const initialState = {
  timespanStart: { date: '2018-02-27', time: '00:00' },
  timespanEnd: { date: '2018-02-27', time: '22:00' },
  customerId: 100360253,
  sessionId: 1130344,
  fetchingHermione: false,
  data: {},
};

export const api = (state = initialState, action) => {
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
    case 'SET_DATA': {
      return {
        ...state,
        data: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
