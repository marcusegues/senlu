// @flow
import type { QueryState } from './query';

export type AppState = {
  query: QueryState,
};

export type Id = string;
export type Index = number;

export type ServiceId = Id;
export type DegradationId = Id;
export type SelectedRowIndex = Index;
