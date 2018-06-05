// @flow
import {
  getHarryTimeSpanFormat,
  getHermioneTimeSpanFormat,
} from '../utils/hermione';
import * as hermioneApi from '../api/hermione';
import * as harryApi from '../api/harry';
import * as dumbledoreApi from '../api/dumbledore';
import { getMacAddress, getTimeSpanEnd, getTimeSpanStart } from '../selectors';
import type {
  DegradationNames,
  DegradationsByService,
  IsFetching,
} from '../types/reducers/query';
import type { Dispatch, GetState } from '../types';
import type { Action } from '../types/actions/actions';

export const setFetchingFrontendDegradationsByService = (
  fetching: IsFetching
): Action => ({
  type: 'SET_FETCHING_FRONTEND_DEGRADATIONS_BY_SERVICE',
  fetching,
});

export const setFetchingBackendDegradationsByService = (
  fetching: IsFetching
): Action => ({
  type: 'SET_FETCHING_BACKEND_DEGRADATIONS_BY_SERVICE',
  fetching,
});

export const setFetchingDegradationNames = (fetching: IsFetching): Action => ({
  type: 'SET_FETCHING_DEGRADATION_NAMES',
  fetching,
});

export const setFrontendDegradationsByService = (
  data: DegradationsByService
): Action => ({
  type: 'SET_FRONTEND_DEGRADATIONS_BY_SERVICE',
  data,
});

export const setBackendDegradationsByService = (
  data: DegradationsByService
): Action => ({
  type: 'SET_BACKEND_DEGRADATIONS_BY_SERVICE',
  data,
});

export const setDegradationNames = (data: DegradationNames): Action => ({
  type: 'SET_DEGRADATION_NAMES',
  data,
});

export const fetchFrontendDegradations = () => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const state = getState();
  const macAddress = getMacAddress(state);
  const timeSpanStart = getTimeSpanStart(state);
  const timeSpanEnd = getTimeSpanEnd(state);
  dispatch(setFetchingFrontendDegradationsByService(true));
  dispatch(setFrontendDegradationsByService({})); // reset the data so UI does not show stale data
  return hermioneApi
    .getDegradationsByMac(
      macAddress,
      getHermioneTimeSpanFormat(timeSpanStart),
      getHermioneTimeSpanFormat(timeSpanEnd)
    )
    .then(data => {
      debugger;
      dispatch(setFetchingFrontendDegradationsByService(false));
      // eslint-disable-next-line no-console
      console.log('Hermione data is', data);
      return data;
    })
    .catch(e => {
      debugger;
      dispatch(setFetchingFrontendDegradationsByService(false));
      dispatch({ type: 'SET_ERROR_FETCH_ERRORS_BY_SERVICE', error: e.message }); // add error to redux no matter what
    });
};

export const fetchBackendDegradations = () => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const state = getState();
  const macAddress = getMacAddress(state);
  const timeSpanStart = getTimeSpanStart(state);
  const timeSpanEnd = getTimeSpanEnd(state);
  dispatch(setFetchingBackendDegradationsByService(true));
  dispatch(setBackendDegradationsByService({})); // reset the data so UI does not show stale data
  return harryApi
    .getBackendDegradationsByMac(
      macAddress,
      getHarryTimeSpanFormat(timeSpanStart),
      getHarryTimeSpanFormat(timeSpanEnd)
    )
    .then(data => {
      dispatch(setFetchingBackendDegradationsByService(false));
      // eslint-disable-next-line no-console
      console.log('Harry data is', data);
      dispatch(setBackendDegradationsByService(data));
      return data;
    })
    .catch(e => {
      dispatch(setFetchingBackendDegradationsByService(false));
      dispatch({ type: 'SET_ERROR_FETCH_ERRORS_BY_SERVICE', error: e.message }); // add error to redux no matter what
      throw e;
    });
};

export const fetchDegradationNames = () => (dispatch: Dispatch) => {
  dispatch(setFetchingDegradationNames(true));
  return dumbledoreApi.getDegradationNames().then((data: DegradationNames) => {
    dispatch(setFetchingDegradationNames(false));
    // eslint-disable-next-line no-console
    console.log('Dumbledore degradations by name is', data);
    dispatch(setDegradationNames(data));
    return data;
  });
};
