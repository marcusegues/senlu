// @flow
import type { ErrorsByServiceState } from '../../types/reducers/query/errorsByService';
import type {
  Degradation,
  DegradationName,
  DegradationsByService,
  Fetching,
} from '../../types/reducers/query';
import type { Index, ServiceId } from '../../types/reducers';

export const getFetchingErrorsByService = (
  state: ErrorsByServiceState
): Fetching => state.fetchingErrorsByService;

export const getErrorsByService = (
  state: ErrorsByServiceState
): DegradationsByService => state.errorsByService;

export const getError = (
  state: ErrorsByServiceState,
  serviceId: ServiceId,
  idx: Index
): Degradation => state.errorsByService[serviceId][idx];

export const getDegradationNameById = (
  state: ErrorsByServiceState,
  idx: Index
): DegradationName => state.degradationNames[idx];
