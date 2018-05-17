// @flow
import type {
  IsFetching,
  DegradationsByService,
  DegradationNames,
} from './index';
import type { SelectedRowIndex, DegradationId, ServiceId } from '../index';

export type SelectedDegradation =
  | {
      serviceId: ServiceId,
      degradationId: DegradationId,
      selectedRowIndex: SelectedRowIndex,
    }
  | 'noSelection';

export type DegradationsByServiceState = {
  fetchingFrontendDegradationsByService: IsFetching,
  frontendDegradationsByService: DegradationsByService,
  fetchingDegradationNames: IsFetching,
  selectedDegradation: SelectedDegradation,
  degradationNames: DegradationNames,
};

export const initialDegradationsByService = {};

export const initialSelectedDegradation: SelectedDegradation = 'noSelection';
