// @flow
import type { MacAddress, SessionId, TimeSpanDelimiter } from './index';

export type ParametersState = {
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  macAddress: MacAddress,
  sessionId: SessionId,
};
