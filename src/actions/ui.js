import { fetchDumbledoreUserServices } from './dumbledore';
import { fetchHermioneDegradations } from './hermione';

export const updateUIData = () => (dispatch, getState) => {
  dispatch(fetchHermioneDegradations());
  dispatch(fetchDumbledoreUserServices());
};
