import { fetchDumbledoreUserServices } from './services';
import { fetchHermioneDegradations } from './errorsByService';

export const updateUIData = () => dispatch => {
  dispatch(fetchHermioneDegradations());
  dispatch(fetchDumbledoreUserServices());
};
