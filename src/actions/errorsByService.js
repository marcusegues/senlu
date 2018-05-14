// @flow
import { getHermioneTimespanFormat } from '../utils/hermione';
import * as hermioneApi from '../api/hermione';
import * as dumbledoreApi from '../api/dumbledore';
import { getMacAddress, getTimeSpanEnd, getTimeSpanStart } from '../selectors';
import type {
  DegradationNames,
  DegradationsByService,
  Fetching,
} from '../types/reducers/query';
import type { Dispatch, GetState } from '../types';
import type { Action } from '../types/actions/actions';

export const setFetchingErrorsByService = (fetching: Fetching): Action => ({
  type: 'SET_FETCHING_ERRORS_BY_SERVICE',
  fetching,
});

export const setFetchingDegradationNames = (fetching: Fetching): Action => ({
  type: 'SET_FETCHING_DEGRADATION_NAMES',
  fetching,
});

export const setErrorsByService = (data: DegradationsByService): Action => ({
  type: 'SET_ERRORS_BY_SERVICE',
  data,
});

export const setDegradationNames = (data: DegradationNames): Action => ({
  type: 'SET_DEGRADATION_NAMES',
  data,
});

export const fetchHermioneDegradations = () => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const state = getState();
  const macAddress = getMacAddress(state);
  const timeSpanStart = getTimeSpanStart(state);
  const timeSpanEnd = getTimeSpanEnd(state);
  dispatch(setFetchingErrorsByService(true));
  dispatch(setErrorsByService({})); // reset the data so UI does not show stale data
  return hermioneApi
    .getDegradationsByMac(
      macAddress,
      getHermioneTimespanFormat(timeSpanStart),
      getHermioneTimespanFormat(timeSpanEnd)
    )
    .then(data => {
      dispatch(setFetchingErrorsByService(false));
      // eslint-disable-next-line no-console
      console.log('Hermione data is', data);
      return data;
    })
    .catch(e => {
      dispatch(setFetchingErrorsByService(false));
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
