import * as dumbledoreApi from '../api/dumbledore';

export const fetchMacAddressByCustomerId = customerId => dispatch => {
  dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: true });
  return dumbledoreApi
    .getMacAddressByCustomerId(customerId)
    .then(data => {
      dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: false });
      dispatch({ type: 'SET_MAC_ADDRESS', macAddress: data.device_address });
      return data;
    })
    .catch(error => {
      dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: false });
      dispatch({ type: 'SET_ERROR_FETCH_MAC_ADDRESS', error: error.message });
    });
};
