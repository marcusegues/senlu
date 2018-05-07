// @flow
import type {
  CustomerId,
  MacAddress,
  SessionId,
  TimeSpanDelimiter,
  AccessToken,
  Fetching,
} from './index';

export type ParametersState = {
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  customerId: CustomerId,
  macAddress: MacAddress,
  fetchingMacAddress: Fetching,
  sessionId: SessionId,
  accessToken: AccessToken,
};
