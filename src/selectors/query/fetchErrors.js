// @flow
import type {
  FetchError,
  FetchErrorsState,
} from '../../types/reducers/query/fetchErrors';

export const getErrorFetchMacAddress = (state: FetchErrorsState): FetchError =>
  state.errorFetchMacAddress;

export const getErrorFetchErrorsByService = (
  state: FetchErrorsState
): FetchError => state.errorFetchErrorsByService;

export const getErrorFetchServices = (state: FetchErrorsState): FetchError =>
  state.errorFetchServices;
