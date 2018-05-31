// @flow
import type { StatusInfoState } from '../../types/reducers/query/statusInfo';
import {
  initialFetchingStatusInfo,
  initialSoftwareVersion,
  initialTechnology,
  initialUptime,
} from '../../types/reducers/query/statusInfo';
import type { Action } from '../../types/actions/actions';

const initialState: StatusInfoState = {
  softwareVersion: initialSoftwareVersion,
  uptime: initialUptime,
  fetchingStatusInfo: initialFetchingStatusInfo,
  latestSoftwareVersion: initialSoftwareVersion,
  technology: initialTechnology,
};

export const statusInfo = (
  state: StatusInfoState = initialState,
  action: Action
) => {
  switch (action.type) {
    case 'SET_FETCHING_STATUS_INFO': {
      return {
        ...state,
        fetchingStatusInfo: action.fetching,
      };
    }
    case 'SET_STATUS_INFO': {
      return {
        ...state,
        softwareVersion: action.softwareVersion,
        uptime: action.uptime,
      };
    }
    case 'SET_LATEST_SOFTWARE_VERSION': {
      return {
        ...state,
        latestSoftwareVersion: action.softwareVersion,
      };
    }
    case 'SET_TECHNOLOGY': {
      return {
        ...state,
        technology: action.technology,
      };
    }
    default: {
      return state;
    }
  }
};
