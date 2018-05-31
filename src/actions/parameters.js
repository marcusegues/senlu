// @flow
import * as dumbledoreApi from '../api/dumbledore';
import type { CustomerId } from '../types/reducers/query';
import type { Dispatch } from '../types';

export const fetchMacAddressByCustomerId = (
  customerId: CustomerId,
  accessToken: string
) => (dispatch: Dispatch): Promise<{ device_address: string } | Error> => {
  dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: true });
  return dumbledoreApi
    .getMacAddressByCustomerId(customerId, accessToken)
    .then((data: { device_address: string }): { device_address: string } => {
      dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: false });
      dispatch({ type: 'SET_MAC_ADDRESS', macAddress: data.device_address });
      return data;
    })
    .catch((error: Error): Error => {
      dispatch({ type: 'SET_FETCHING_MAC_ADDRESS', fetching: false });
      dispatch({ type: 'SET_ERROR_FETCH_MAC_ADDRESS', error: error.message });
      return error;
    });
};
