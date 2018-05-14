import type {
  AccessToken,
  DegradationNames,
  DegradationsByService,
  Fetching,
  MacAddress,
  Services,
  SessionId,
  TimeSpanDelimiter,
} from '../reducers/query';
import type { SelectedDegradation } from '../reducers/query/errorsByService';
import type { SoftwareVersion, Uptime } from '../reducers/query/statusInfo';

export type Action =
  // errorsByService
  | {
    type: 'SET_FETCHING_ERRORS_BY_SERVICE',
    fetching: Fetching,
  }
  | {
    type: 'SET_FETCHING_DEGRADATION_NAMES',
    fetching: Fetching,
  }
  | {
    type: 'SET_ERRORS_BY_SERVICE',
    errorsByService: DegradationsByService,
  }
  | {
    type: 'SET_DEGRADATION_NAMES',
    degradationNames: DegradationNames,
  }
  | {
    type: 'SET_SELECTED_DEGRADATION',
    selectedDegradation: SelectedDegradation,
  }
  // fetchErrors
  | {
    type: 'SET_ERROR_FETCH_MAC_ADDRESS',
    errorFetchMacAddress: FetchError,
  }
  | {
    type: 'RESET_ERROR_FETCH_MAC_ADDRESS',
  }
  | {
    type: 'SET_ERROR_FETCH_SERVICES',
    errorFetchServices: FetchError,
  }
  | {
    type: 'RESET_ERROR_FETCH_SERVICES',
  }
  | {
    type: 'SET_ERROR_MISSING_CUSTOMER_ID',
    errorMissingCustomerId: FetchError,
  }
  | {
    type: 'RESET_ERROR_MISSING_CUSTOMER_ID',
  }
  | {
    type: 'SET_ERROR_MISSING_SESSION_ID',
    errorMissingSessionId: FetchError,
  }
  | {
    type: 'RESET_ERROR_MISSING_SESSION_ID',
  }
  // parameters
  | {
    type: 'SET_CUSTOMER_ID',
    customerId: CustomerId,
  }
  | {
    type: 'SET_MAC_ADDRESS',
    macAddress: MacAddress,
  }
  | {
    type: 'SET_FETCHING_MAC_ADDRESS',
    fetchingMacAddress: Fetching,
  }
  | {
    type: 'SET_CUSTOMER_ID',
    customerId: CustomerId,
  }
  | {
    type: 'SET_TIMESPAN_START',
    timeSpanStart: TimeSpanDelimiter,
  }
  | {
    type: 'SET_TIMESPAN_END',
    timeSpanEnd: TimeSpanDelimiter,
  }
  // Services
  | {
    type: 'SET_FETCHING_SERVICES',
    fetchingServices: Fetching,
  }
  | {
    type: 'SET_SERVICES',
    services: Services,
  }
  | {
    type: 'RESET_SERVICES',
  }
  // StatusInfo
  | {
    type: 'SET_FETCHING_STATUS_INFO',
    fetchingStatusInfo: Fetching,
  }
  | {
    type: 'SET_STATUS_INFO',
    softwareVersion: SoftwareVersion,
    uptime: Uptime,
  };
