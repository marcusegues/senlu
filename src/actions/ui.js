import {
  fetchDumbledoreUserServices,
  resetServices,
  setServices,
} from './services';
import {
  fetchHermioneDegradations,
  setErrorsByService,
} from './errorsByService';
import { initialErrorsByService } from '../types/reducers/query/errorsByService';

export const updateUIData = () => dispatch => {
  Promise.all([
    dispatch(fetchHermioneDegradations()).catch(e => {
      debugger;
      dispatch({ type: 'SET_ERROR_FETCH_ERRORS_BY_SERVICE', error: e.message }); // add error to redux no matter what
      throw e;
    }),
    dispatch(fetchDumbledoreUserServices()).catch(e => {
      debugger;
      dispatch({ type: 'SET_ERROR_FETCH_SERVICES', error: e.message }); // add error to redux no matter what
      throw e;
    }),
  ])
    .then(([degradations, services]) => {
      // if both calls succeed, then set the data from their responses
      dispatch(setServices(services));
      dispatch(setErrorsByService(degradations));
    })
    .catch(() => {
      // if either of the calls fails, reset the data for both of the calls
      debugger;
      dispatch(setErrorsByService(initialErrorsByService));
      dispatch(resetServices());
    });
};
