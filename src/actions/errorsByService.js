import { getHermioneTimespanFormat } from '../utils/hermione';
import * as hermioneApi from '../api/hermione';
import { getMacAddress, getTimeSpanEnd, getTimeSpanStart } from '../selectors';

export const setFetchingErrorsByService = fetching => ({
  type: 'SET_FETCHING_ERRORS_BY_SERVICE',
  fetching,
});

export const setErrorsByService = data => ({
  type: 'SET_ERRORS_BY_SERVICE',
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
      if (data[0]) {
        // currently this is the only way of knowing a response was an error, need to improve this in the backend
        throw new Error(data[0]);
      }
      return data;
    });
};
