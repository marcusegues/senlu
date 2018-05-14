// @flow
import * as dumbledoreApi from '../api/dumbledore';
import type { Dispatch } from '../types';
import type { Fetching, Services } from '../types/reducers/query';
import type { Action } from '../types/actions/actions';

export const setFetchingUserServices = (fetching: Fetching): Action => ({
  type: 'SET_FETCHING_SERVICES',
  fetching,
});

export const setServices = (data: Services): Action => ({
  type: 'SET_SERVICES',
  data,
});

export const resetServices = (): Action => ({
  type: 'RESET_SERVICES',
});

export const fetchDumbledoreUserServices = () => (
  dispatch: Dispatch
): Promise<Services> => {
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
      dispatch({ type: 'SET_ERROR_FETCH_SERVICES', error: e.message }); // add error to redux no matter what
      throw e;
    });
};
