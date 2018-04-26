import { fetchDumbledoreUserServices, setServices } from './services';
import {
  fetchHermioneDegradations,
  setErrorsByService,
} from './errorsByService';

export const updateUIData = () => dispatch => {
  Promise.all([
    dispatch(fetchHermioneDegradations()).catch(e => {
      dispatch({ type: 'SET_ERROR_FETCH_ERRORS_BY_SERVICE', error: e.message }); // add error to redux no matter what
    }),
    dispatch(fetchDumbledoreUserServices()).catch(e => {
      dispatch({ type: 'SET_ERROR_FETCH_SERVICES', error: e.message }); // add error to redux no matter what
    }),
  ])
    .then(([degradations, services]) => {
      // if both calls succeed, then set the data from their responses
      dispatch(setServices(services));
      dispatch(setErrorsByService(degradations));
    })
    .catch(e => {
      // if either of the calls fails, reset the data for both of the calls
      dispatch(setErrorsByService({}));
      dispatch(setServices([]));
    });
};
