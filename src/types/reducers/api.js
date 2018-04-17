// @flow

import type {
  CustomerId,
  FetchingHermione,
  SessionId,
  TimespanDelimiter,
} from '../api';

export type ApiState = {
  timespanStart: TimespanDelimiter,
  timespanEnd: TimespanDelimiter,
  customerId: CustomerId,
  sessionId: SessionId,
  fetchingHermione: FetchingHermione,
  data: {},
};
