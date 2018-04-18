import * as dumbledoreApi from '../api/dumbledore';

export const setFetchingDumbledore = fetching => ({
  type: 'SET_FETCHING_DUMBLEDORE',
  fetching,
});

export const setDumbledoreUserServices = data => ({
  type: 'SET_DUMBLEDORE_USER_SERVICES',
  data,
});

export const fetchDumbledoreUserServices = () => (dispatch, getState) => {
  const state = getState();
  const { customerId } = state.api;
  dispatch(setFetchingDumbledore(true));
  return dumbledoreApi.userServices(customerId).then(data => {
    dispatch(setDumbledoreUserServices(data.services));
    dispatch(setFetchingDumbledore(false));
  });
};
