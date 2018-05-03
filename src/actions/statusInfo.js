import * as hermioneApi from '../api/hermione';
import { getMacAddress } from '../selectors';

export const setFetchingStatusInfo = fetching => ({
  type: 'SET_FETCHING_STATUS_INFO',
  fetching,
});

export const setStatusInfo = (softwareVersion, uptime) => ({
  type: 'SET_STATUS_INFO',
  softwareVersion,
  uptime,
});

export const fetchStatusInfo = () => (dispatch, getState) => {
  dispatch(setFetchingStatusInfo(true));
  const state = getState();
  const macAddress = getMacAddress(state);
  return hermioneApi
    .getCurrentStatus(macAddress)
    .then(data => {
      dispatch(setFetchingStatusInfo(false));
      dispatch(setStatusInfo(data.version, data.uptime));
      return data;
    })
    .catch(e => {
      dispatch(setFetchingStatusInfo(false));
      throw e;
    });
};
