// @flow
import {
  fetchDumbledoreUserServices,
  resetServices,
  setServices,
} from './services';
import {
  fetchFrontendDegradations,
  setErrorsByService,
} from './errorsByService';
import { initialErrorsByService } from '../types/reducers/query/errorsByService';
import type { Dispatch } from '../types';

export const updateUIData = () => (dispatch: Dispatch) => {
  Promise.all([
    dispatch(fetchFrontendDegradations()),
    dispatch(fetchDumbledoreUserServices()),
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
