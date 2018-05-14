// @flow
import type { ParametersState } from './parameters';
import type { ErrorsByServiceState } from './errorsByService';
import type { ServicesState } from './services';
import type { Id } from '../index';

export type Service =
  | 'Linear TV OTT'
  | 'Linear TV FttH'
  | 'Replay'
  | 'Recordings'
  | 'VoD'
  | 'Pay TV Linear'
  | 'Radio'
  | 'EPG'
  | 'Teletext'
  | 'Linear TV DVB'
  | 'Subtitles'
  | 'Trick modes'
  | 'Profiles'
  | 'Channellist'
  | 'Parental control'
  | 'Search ( text )'
  | 'Launcher'
  | 'Multiroom Scearios'
  | 'System Settings'
  | 'Standby mode'
  | 'Low power mode'
  | 'First install'
  | 'HbbTV'
  | 'Recommendations'
  | 'Mypage'
  | 'MyChannel'
  | 'Factor Reset'
  | 'Audio Selection'
  | 'Home Network'
  | 'Internet Access'
  | 'Remote Control Unit'
  | 'Google Managed Services (GMS) other'
  | 'GMS Youtube'
  | 'GMS Play Movies'
  | 'GMS Music'
  | 'GMS Voice Search'
  | 'GMS Assistant'
  | 'GMS Software update'
  | 'GMS Playstore'
  | 'Live Tv App';

export type Services = { [Id]: Service };

// Parameters
export type CustomerId = string;
export type MacAddress = string;
export type SessionId = string;
export type AccessToken = string;
export type TimeSpanDelimiter = { date: string, time: string };

// UI flags
export type Fetching = boolean;

// API response
export type DegradationName = string;
export type Count = number;
export type TimeString = string;
export type Version = string;

export type Proportion = {
  error_label: Id,
  proportion: number,
  service: Id,
};

export type Proportions = Array<Proportion>;

export type Log = string;
export type Logs = Array<Log>;

export type Degradation = {
  id?: Id,
  degradation: DegradationName,
  count: Count,
  timeStart: TimeString,
  timeEnd: TimeString,
  version: Version,
  proportions: Proportions,
  uptime: string,
  logs: Logs,
};

export type DegradationArray = Array<Degradation>;
export type DegradationsByService = { [Id]: DegradationArray };

export type DegradationNames = Array<Degradation>;
export const initialDegradationNames = [];

export type QueryState = {
  parameters: ParametersState,
  errorsByService: ErrorsByServiceState,
  services: ServicesState,
};
