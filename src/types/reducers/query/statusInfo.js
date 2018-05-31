// @flow
import type { IsFetching } from './index';

export type Uptime = string;
export type SoftwareVersion = string;
export type Technology = string;

export type StatusInfoState = {
  softwareVersion: SoftwareVersion,
  uptime: Uptime,
  fetchingStatusInfo: IsFetching,
  latestSoftwareVersion: SoftwareVersion,
  technology: Technology,
};

export const initialUptime = '';
export const initialSoftwareVersion = '';
export const initialFetchingStatusInfo = false;
export const initialTechnology = '';
