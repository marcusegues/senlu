// @flow
import type { Fetching } from './index';

export type Uptime = string;
export type SoftwareVersion = string;

type StatusInfo = {
    version: SoftwareVersion,
    uptime: Uptime,
};

export type StatusInfoState = {
  softwareVersion: SoftwareVersion,
  uptime: Uptime,
  fetchingStatusInfo: Fetching,
};

export const initialUptime = '';
export const initialSoftwareVersion = '';
export const initialFetchingStatusInfo = false;
