// @flow
export type FetchError = ?string;

export type FetchErrorsState = {
  errorFetchMacAddress: FetchError,
  errorFetchServices: FetchError,
  errorFetchErrorsByService: FetchError,
};
