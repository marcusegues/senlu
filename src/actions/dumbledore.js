import * as dumbledoreApi from '../api/dumbledore';
import { getCustomerId } from '../selectors';

export const setFetchingUserServices = fetching => ({
  type: 'SET_FETCHING_USER_SERVICES',
  fetching,
});

export const setDumbledoreUserServices = data => ({
  type: 'SET_DUMBLEDORE_USER_SERVICES',
  data,
});

export const fetchDumbledoreUserServices = () => (dispatch, getState) => {
  const state = getState();
  const customerId = getCustomerId(state);
  dispatch(setFetchingUserServices(true));
  return dumbledoreApi.userServices(customerId).then(data => {
    dispatch(setDumbledoreUserServices(data.services));
    dispatch(setFetchingUserServices(false));
  });
};
