// @flow
import { formatServiceName } from '../../utils/index';
import type { DumbledoreState } from '../../types/reducers/query/dumbledore';

const initialState: DumbledoreState = {
  fetchingUserServices: false,
  userServices: [],
};

export const dumbledore = (
  state: DumbledoreState = initialState,
  action: any
) => {
  switch (action.type) {
    case 'SET_FETCHING_USER_SERVICES': {
      return {
        ...state,
        fetchingUserServices: action.fetching,
      };
    }
    case 'SET_USER_SERVICES': {
      return {
        ...state,
        userServices: action.data.map(formatServiceName),
      };
    }
    default: {
      return state;
    }
  }
};
