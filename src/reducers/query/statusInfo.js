// @flow
import type { StatusInfoState } from '../../types/reducers/query/statusInfo';
import {
  initialFetchingStatusInfo,
  initialSoftwareVersion,
  initialUptime,
} from '../../types/reducers/query/statusInfo';
import type { Action } from '../../types/actions/actions';

const initialState: StatusInfoState = {
  softwareVersion: initialSoftwareVersion,
  uptime: initialUptime,
  fetchingStatusInfo: initialFetchingStatusInfo,
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
    default: {
      return state;
    }
  }
};
