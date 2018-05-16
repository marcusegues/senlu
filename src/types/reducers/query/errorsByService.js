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

export type ErrorsByServiceState = {
  fetchingErrorsByService: IsFetching,
  errorsByService: DegradationsByService,
  fetchingDegradationNames: IsFetching,
  selectedDegradation: SelectedDegradation,
  degradationNames: DegradationNames,
};

export const initialErrorsByService = {};

export const initialSelectedDegradation: SelectedDegradation = 'noSelection';
