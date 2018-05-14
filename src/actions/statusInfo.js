// @flow
import * as hermioneApi from '../api/hermione';
import { getMacAddress } from '../selectors';
import type { Fetching } from '../types/reducers/query';
import type { Action } from '../types/actions/actions';
import type {
  SoftwareVersion,
  Uptime,
} from '../types/reducers/query/statusInfo';
import type { Dispatch, GetState } from '../types';
import { StatusInfo } from '../components/StatusInfo/StatusInfo';

export const setFetchingStatusInfo = (fetching: Fetching): Action => ({
  type: 'SET_FETCHING_STATUS_INFO',
  fetching,
});

export const setStatusInfo = (
  softwareVersion: SoftwareVersion,
  uptime: Uptime
): Action => ({
  type: 'SET_STATUS_INFO',
  softwareVersion,
  uptime,
});

export const fetchStatusInfo = () => (
  dispatch: Dispatch,
  getState: GetState
): Promise<StatusInfo> => {
  dispatch(setFetchingStatusInfo(true));
  const state = getState();
  const macAddress = getMacAddress(state);
  return hermioneApi
    .getCurrentStatus(macAddress)
    .then((data: StatusInfo): StatusInfo => {
      dispatch(setFetchingStatusInfo(false));
      dispatch(setStatusInfo(data.version, data.uptime));
      return data;
    })
    .catch(e => {
      dispatch(setFetchingStatusInfo(false));
      throw e;
    });
};
