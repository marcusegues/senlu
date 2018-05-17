// @flow
import type { DegradationsByServiceState } from '../../types/reducers/query/degradationsByService';
import type {
  Degradation,
  DegradationName,
  DegradationsByService,
  IsFetching,
} from '../../types/reducers/query';
import type { Index, ServiceId } from '../../types/reducers';

export const getFetchingFrontendDegradationsByService = (
  state: DegradationsByServiceState
): IsFetching => state.fetchingFrontendDegradationsByService;

export const getFrontendDegradationsByService = (
  state: DegradationsByServiceState
): DegradationsByService => state.frontendDegradationsByService;

export const getDegradation = (
  state: DegradationsByServiceState,
  serviceId: ServiceId,
  idx: Index
): Degradation => state.frontendDegradationsByService[serviceId][idx];

export const getDegradationNameById = (
  state: DegradationsByServiceState,
  idx: Index
): DegradationName => state.degradationNames[idx];
