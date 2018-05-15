// @flow
import type { StatusInfoState } from '../../types/reducers/query/statusInfo';
import type { Fetching } from '../../types/reducers/query';

export const getFetchingStatusInfo = (state: StatusInfoState): Fetching =>
  state.fetchingStatusInfo;
