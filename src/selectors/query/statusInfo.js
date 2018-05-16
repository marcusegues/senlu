// @flow
import type { StatusInfoState } from '../../types/reducers/query/statusInfo';
import type { IsFetching } from '../../types/reducers/query';

export const getFetchingStatusInfo = (state: StatusInfoState): IsFetching =>
  state.fetchingStatusInfo;
