// @flow
import type { ServicesState } from '../../types/reducers/query/services';
import { initialServices } from '../../types/reducers/query/services';

const initialState: ServicesState = {
  fetchingServices: false,
  services: initialServices,
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
        services: action.data,
      };
    }
    case 'RESET_SERVICES': {
      return {
        ...state,
        services: initialServices,
      };
    }
    default: {
      return state;
    }
  }
};
