import * as dumbledoreApi from '../api/dumbledore';
import { getMacAddress } from '../selectors/query/parameters';

export const setFetchingUserServices = fetching => ({
  type: 'SET_FETCHING_SERVICES',
  fetching,
});

export const setUserServices = data => ({
  type: 'SET_SERVICES',
  data,
});

export const fetchDumbledoreUserServices = () => (dispatch, getState) => {
  const state = getState();
  const macAddress = getMacAddress(state);
  dispatch(setFetchingUserServices(true));
  return dumbledoreApi.userServices(macAddress).then(data => {
    dispatch(setUserServices(data.services));
    dispatch(setFetchingUserServices(false));
  });
};
