// @flow
import * as hermioneApi from '../api/hermione';
import * as dumbledoreApi from '../api/dumbledore';
import { getMacAddress } from '../selectors';
import type { CustomerId, IsFetching } from '../types/reducers/query';
import type { Action } from '../types/actions/actions';
import type {
  SoftwareVersion,
  Technology,
  Uptime,
} from '../types/reducers/query/statusInfo';
import type { Dispatch, GetState } from '../types';
import { StatusInfo } from '../components/StatusInfo/StatusInfo';

export const setFetchingStatusInfo = (fetching: IsFetching): Action => ({
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

export const setLatestSoftwareVersion = (
  softwareVersion: SoftwareVersion
): Action => ({
  type: 'SET_LATEST_SOFTWARE_VERSION',
  softwareVersion,
});

export const setTechnology = (technology: Technology): Action => ({
  type: 'SET_TECHNOLOGY',
  technology,
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

export const fetchLatestSoftwareVersion = () => (
  dispatch: Dispatch
): Promise<SoftwareVersion> => dumbledoreApi.getLatestSoftwareVersion().then(data => {
    dispatch(setLatestSoftwareVersion(data.firmware));
    return data.firmware;
  });

export const fetchTechnology = (customerId: CustomerId) => (
  dispatch: Dispatch
): Promise<Technology> => dumbledoreApi.getTechnology(customerId).then(data => {
    dispatch(setTechnology(data.technology));
    return data.technology;
  });
