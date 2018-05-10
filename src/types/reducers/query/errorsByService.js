// @flow
import type { Fetching, ErrorsByService } from './index';
import type { SelectedRowIndex, DegradationId, ServiceId } from '../index';

export type SelectedDegradation = {
  serviceId: ?ServiceId,
  degradationId: ?DegradationId,
  selectedRowIndex: ?SelectedRowIndex,
};

export type ErrorsByServiceState = {
  fetchingErrorsByService: Fetching,
  errorsByService: ErrorsByService,
  fetchingDegradationNames: Fetching,
  selectedDegradation: SelectedDegradation,
};

export const initialErrorsByService = {};

export const initialSelectedDegradation = {
  serviceId: null,
  degradationId: null,
  selectedRowIndex: null,
};
