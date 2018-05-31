// @flow
import {
  fetchDumbledoreUserServices,
  resetServices,
  setServices,
} from './services';
import {
  fetchBackendDegradations,
  fetchFrontendDegradations,
  setBackendDegradationsByService,
  setFrontendDegradationsByService,
} from './degradationsByService';
import { initialDegradationsByService } from '../types/reducers/query/degradationsByService';
import type { Dispatch } from '../types';

export const updateUIData = () => (dispatch: Dispatch) => {
  Promise.all([
    dispatch(fetchFrontendDegradations()),
    dispatch(fetchBackendDegradations()),
    dispatch(fetchDumbledoreUserServices()),
  ])
    .then(([frontendDegradations, backendDegradations, services]) => {
      // if all calls succeed, then set the data from their responses
      dispatch(setServices(services));
      dispatch(setFrontendDegradationsByService(frontendDegradations));
      dispatch(setBackendDegradationsByService(backendDegradations));
    })
    .catch(() => {
      // if either of the calls fails, reset the data for all of the calls
      dispatch(setFrontendDegradationsByService(initialDegradationsByService));
      dispatch(setBackendDegradationsByService(initialDegradationsByService));
      dispatch(resetServices());
    });
};
