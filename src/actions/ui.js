// @flow
import {
  fetchDumbledoreUserServices,
  resetServices,
  setServices,
} from './services';
import {
  fetchFrontendDegradations,
  setFrontendDegradationsByService,
} from './degradationsByService';
import { initialDegradationsByService } from '../types/reducers/query/degradationsByService';
import type { Dispatch } from '../types';

export const updateUIData = () => (dispatch: Dispatch) => {
  Promise.all([
    dispatch(fetchFrontendDegradations()),
    dispatch(fetchDumbledoreUserServices()),
  ])
    .then(([degradations, services]) => {
      // if both calls succeed, then set the data from their responses
      dispatch(setServices(services));
      dispatch(setFrontendDegradationsByService(degradations));
    })
    .catch(() => {
      // if either of the calls fails, reset the data for both of the calls
      dispatch(setFrontendDegradationsByService(initialDegradationsByService));
      dispatch(resetServices());
    });
};
