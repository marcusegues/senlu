// @flow
import type {
  CustomerId,
  MacAddress,
  SessionId,
  TimeSpanDelimiter,
} from './index';

export type ParametersState = {
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  customerId: CustomerId,
  macAddress: MacAddress,
  sessionId: SessionId,
};
