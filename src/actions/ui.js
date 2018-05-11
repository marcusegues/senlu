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
    dispatch(fetchHermioneDegradations()),
    dispatch(fetchDumbledoreUserServices())
  ])
    .then(([degradations, services]) => {
      // if both calls succeed, then set the data from their responses
      dispatch(setServices(services));
      dispatch(setErrorsByService(degradations));
    })
    .catch(() => {
      // if either of the calls fails, reset the data for both of the calls
      dispatch(setErrorsByService(initialErrorsByService));
      dispatch(resetServices());
    });
};
