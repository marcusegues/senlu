// @flow
import type { CustomerId, SessionId, TimeSpanDelimiter } from './index';

export type ParametersState = {
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  customerId: string,
  sessionId: SessionId,
};
