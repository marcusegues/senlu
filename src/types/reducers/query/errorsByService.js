// @flow
import type { Fetching, ErrorsByService } from './index';

export type ErrorsByServiceState = {
  fetchingErrorsByService: Fetching,
  errorsByService: ErrorsByService,
};

export const initialErrorsByService = {};
