// @flow
import { formatServiceName } from '../../utils/index';
import type { ServicesState } from '../../types/reducers/query/services';

const initialState: ServicesState = {
  fetchingServices: false,
  services: [],
};

export const services = (state: ServicesState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_FETCHING_SERVICES': {
      return {
        ...state,
        fetchingServices: action.fetching,
      };
    }
    case 'SET_SERVICES': {
      return {
        ...state,
        services: action.data.map(formatServiceName),
      };
    }
    default: {
      return state;
    }
  }
};
