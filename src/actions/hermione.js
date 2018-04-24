import { getHermioneTimespanFormat } from '../utils/hermione';
import * as hermioneApi from '../api/hermione';
import { getCustomerId, getTimeSpanEnd, getTimeSpanStart } from '../selectors';

export const setFetchingErrorsByService = fetching => ({
  type: 'SET_FETCHING_HERMIONE',
  fetching,
});

export const setErrorsByService = data => ({
  type: 'SET_ERRORS_BY_SERVICE',
  data,
});

export const fetchHermioneDegradations = () => (dispatch, getState) => {
  const state = getState();
  const customerId = getCustomerId(state);
  const timeSpanStart = getTimeSpanStart(state);
  const timeSpanEnd = getTimeSpanEnd(state);
  dispatch(setFetchingErrorsByService(true));
  dispatch(setErrorsByService({})); // reset the data so UI does not show stale data
  return hermioneApi
    .getDegradationsByCustomerId(
      customerId,
      getHermioneTimespanFormat(timeSpanStart),
      getHermioneTimespanFormat(timeSpanEnd)
    )
    .then(data => {
      // eslint-disable-next-line no-console
      console.log('Hermione data is', data);
      dispatch(setErrorsByService(data));
      dispatch(setFetchingErrorsByService(false));
    });
};
