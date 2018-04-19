import { fetchDumbledoreUserServices } from './dumbledore';
import { fetchHermioneDegradations } from './hermione';

export const updateUIData = () => dispatch => {
  dispatch(fetchHermioneDegradations());
  dispatch(fetchDumbledoreUserServices());
};
