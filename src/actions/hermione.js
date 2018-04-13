import { getHermioneTimespanFormat } from '../utils/hermione';
import * as hermioneApi from '../api/hermione';

export const setFetchingHermione = fetching => ({
  type: 'SET_FETCHING_HERMIONE',
  fetching,
});

export const setData = data => ({
  type: 'SET_DATA',
  data,
});

export const fetchHermioneDegradations = () => {
  return (dispatch, getState) => {
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
        console.log('Hermione Degradations: ', data);
        dispatch(setData(data));
        dispatch(setFetchingHermione(false));
      });
  };
};
