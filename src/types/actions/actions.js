// @flow
import type {
  AccessToken,
  CustomerId,
  DegradationNames,
  DegradationsByService,
  IsFetching,
  MacAddress,
  Services,
  SessionId,
  TimeSpanDelimiter,
} from '../reducers/query';
import type { SelectedDegradation } from '../reducers/query/errorsByService';
import type {
  SoftwareVersion,
  Technology,
  Uptime,
} from '../reducers/query/statusInfo';
import type { FetchError } from '../reducers/query/fetchErrors';

export type Action =
  // errorsByService
  | {
    type: 'SET_FETCHING_ERRORS_BY_SERVICE',
    fetching: IsFetching,
  }
  | {
    type: 'SET_FETCHING_DEGRADATION_NAMES',
    fetching: IsFetching,
  }
  | {
    type: 'SET_ERRORS_BY_SERVICE',
    data: DegradationsByService,
  }
  | {
    type: 'SET_DEGRADATION_NAMES',
    data: DegradationNames,
  }
  | {
    type: 'SET_SELECTED_DEGRADATION',
    selectedDegradation: SelectedDegradation,
  }
  // fetchErrors
  | {
    type: 'SET_ERROR_FETCH_MAC_ADDRESS',
    error: FetchError,
  }
  | {
    type: 'RESET_ERROR_FETCH_MAC_ADDRESS',
  }
  | {
    type: 'SET_ERROR_FETCH_SERVICES',
    error: FetchError,
  }
  | {
    type: 'RESET_ERROR_FETCH_SERVICES',
  }
  | {
    type: 'SET_ERROR_MISSING_CUSTOMER_ID',
    error: FetchError,
  }
  | {
    type: 'RESET_ERROR_MISSING_CUSTOMER_ID',
  }
  | {
    type: 'SET_ERROR_MISSING_SESSION_ID',
    error: FetchError,
  }
  | {
    type: 'RESET_ERROR_MISSING_SESSION_ID',
  }
  | {
    type: 'SET_ERROR_MISSING_ACCESS_TOKEN',
    error: FetchError,
  }
  | {
    type: 'SET_ERROR_FETCH_ERRORS_BY_SERVICE',
    error: FetchError,
  }
  | {
    type: 'RESET_ERROR_FETCH_ERRORS_BY_SERVICE',
  }
  // parameters
  | {
    type: 'SET_CUSTOMER_ID',
    customerId: CustomerId,
  }
  | {
    type: 'SET_SESSION_ID',
    sessionId: SessionId,
  }
  | {
    type: 'SET_MAC_ADDRESS',
    macAddress: MacAddress,
  }
  | {
    type: 'SET_ACCESS_TOKEN',
    accessToken: AccessToken,
  }
  | {
    type: 'SET_FETCHING_MAC_ADDRESS',
    fetching: IsFetching,
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
    fetching: IsFetching,
  }
  | {
    type: 'SET_SERVICES',
    data: Services,
  }
  | {
    type: 'RESET_SERVICES',
  }
  // StatusInfo
  | {
    type: 'SET_FETCHING_STATUS_INFO',
    fetching: IsFetching,
  }
  | {
    type: 'SET_STATUS_INFO',
    softwareVersion: SoftwareVersion,
    uptime: Uptime,
  }
  | {
    type: 'SET_LATEST_SOFTWARE_VERSION',
    softwareVersion: SoftwareVersion,
  }
  | {
    type: 'SET_TECHNOLOGY',
    technology: Technology,
  };
