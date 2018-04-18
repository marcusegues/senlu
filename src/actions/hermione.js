import { getHermioneTimespanFormat } from '../utils/hermione';
import * as hermioneApi from '../api/hermione';

export const setFetchingHermione = fetching => ({
  type: 'SET_FETCHING_HERMIONE',
  fetching,
});

export const setHermioneErrorsByService = data => ({
  type: 'SET_HERMIONE_ERRORS_BY_SERVICE',
  data,
});

export const fetchHermioneDegradations = () => (dispatch, getState) => {
  const state = getState();
  const { customerId, timespanStart, timespanEnd } = state.api;
  dispatch(setFetchingHermione(true));
  return hermioneApi
    .getDegradationsByCustomerId(
      customerId,
      getHermioneTimespanFormat(timespanStart),
      getHermioneTimespanFormat(timespanEnd)
    )
    .then(data => {
      dispatch(setHermioneErrorsByService(data));
      dispatch(setFetchingHermione(false));
    });
};
