// @flow
import * as dumbledoreApi from '../api/dumbledore';
import type { CustomerId, DegradationName } from '../types/reducers/query';
import type { Dispatch } from '../types';

export const fetchMacAddressByCustomerId = (customerId: CustomerId) => (
  dispatch: Dispatch
): Promise<{ device_address: string } | DegradationName> => {
  dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: true });
  return dumbledoreApi
    .getMacAddressByCustomerId(customerId)
    .then((data: { device_address: string }) => {
      dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: false });
      dispatch({ type: 'SET_MAC_ADDRESS', macAddress: data.device_address });
      return data;
    })
    .catch(error => {
      dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: false });
      dispatch({ type: 'SET_ERROR_FETCH_MAC_ADDRESS', error: error.message });
      return error;
    });
};
