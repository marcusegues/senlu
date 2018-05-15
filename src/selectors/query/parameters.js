// @flow
// parameters
import type {
  CustomerId,
  MacAddress,
  SessionId,
  TimeSpanDelimiter,
} from '../../types/reducers/query';
import type { ParametersState } from '../../types/reducers/query/parameters';

export const getCustomerId = (state: ParametersState): CustomerId =>
  state.customerId;
export const getMacAddress = (state: ParametersState): MacAddress =>
  state.macAddress;
export const getSessionId = (state: ParametersState): SessionId =>
  state.sessionId;
export const getTimeSpanStart = (state: ParametersState): TimeSpanDelimiter =>
  state.timeSpanStart;
export const getTimeSpanEnd = (state: ParametersState): TimeSpanDelimiter =>
  state.timeSpanEnd;
