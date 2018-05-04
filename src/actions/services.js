import * as dumbledoreApi from '../api/dumbledore';
import { getMacAddress } from '../selectors';

export const setFetchingUserServices = fetching => ({
  type: 'SET_FETCHING_SERVICES',
  fetching,
});

export const setServices = data => ({
  type: 'SET_SERVICES',
  data,
});

export const resetServices = () => ({
  type: 'RESET_SERVICES',
});

export const fetchDumbledoreUserServices = () => (dispatch, getState) => {
  dispatch(setFetchingUserServices(true));
  dispatch(resetServices());
  return dumbledoreApi
    .userServices()
    .then(data => {
      dispatch(setFetchingUserServices(false));
      return data;
    })
    .catch(e => {
      dispatch(setFetchingUserServices(false));
      throw e;
    });
};
