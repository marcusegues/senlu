import { getHermioneTimespanFormat } from '../utils/hermione';
import * as hermioneApi from '../api/hermione';
import * as dumbledoreApi from '../api/dumbledore';
import { getMacAddress, getTimeSpanEnd, getTimeSpanStart } from '../selectors';

export const setFetchingErrorsByService = fetching => ({
  type: 'SET_FETCHING_ERRORS_BY_SERVICE',
  fetching,
});

export const setFetchingDegradationNames = fetching => ({
  type: 'SET_FETCHING_DEGRADATION_NAMES',
  fetching,
});

export const setErrorsByService = data => ({
  type: 'SET_ERRORS_BY_SERVICE',
  data,
});

export const setDegradationNames = data => ({
  type: 'SET_DEGRADATION_NAMES',
  data,
});

export const fetchHermioneDegradations = () => (dispatch, getState) => {
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

export const fetchDegradationNames = () => dispatch => {
  dispatch(setFetchingDegradationNames(true));
  return dumbledoreApi.getDegradationNames().then(data => {
    dispatch(setFetchingDegradationNames(false));
    // eslint-disable-next-line no-console
    console.log('Dumbledore degradations by name is', data);
    dispatch(setDegradationNames(data));
    return data;
  });
};
