// @flow
import type {
  CustomerId,
  MacAddress,
  SessionId,
  TimeSpanDelimiter,
  AccessToken,
  IsFetching,
} from './index';

export type ParametersState = {
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  customerId: CustomerId,
  macAddress: MacAddress,
  fetchingMacAddress: IsFetching,
  sessionId: SessionId,
  accessToken: AccessToken,
};
