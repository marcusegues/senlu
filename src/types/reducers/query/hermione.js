// @flow
import type { Fetching, ErrorsByService } from './index';

export type HermioneState = {
  fetchingErrorsByService: Fetching,
  errorsByService: ErrorsByService,
};
