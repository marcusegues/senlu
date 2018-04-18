// @flow

import type {
  CustomerId,
  Fetching,
  SessionId,
  TimespanDelimiter,
} from '../api';

export type ApiState = {
  timespanStart: TimespanDelimiter,
  timespanEnd: TimespanDelimiter,
  customerId: CustomerId,
  sessionId: SessionId,
  fetchingHermione: Fetching,
  fetchingDumbledore: Fetching,
  hermioneErrorsByService: {},
  dumbledoreUserServices: [],
};
