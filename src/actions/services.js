import * as dumbledoreApi from '../api/dumbledore';
import { getMacAddress } from '../selectors/query/parameters';

export const setFetchingUserServices = fetching => ({
  type: 'SET_FETCHING_SERVICES',
  fetching,
});

export const setServices = data => ({
  type: 'SET_SERVICES',
  data,
});

export const fetchDumbledoreUserServices = () => (dispatch, getState) => {
  const state = getState();
  const macAddress = getMacAddress(state);
  dispatch(setFetchingUserServices(true));
  dispatch(setServices([]));
  return dumbledoreApi.userServices(macAddress).then(data => {
    dispatch(setFetchingUserServices(false));
    if (data[0]) {
      // currently this is the only way of knowing a response was an error, need to improve this in the backend
      throw new Error(data[0]);
    }
    return data.services;
  });
};
