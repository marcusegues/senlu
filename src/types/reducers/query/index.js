// @flow
import type { ParametersState } from './parameters';
import type { DegradationsByServiceState } from './degradationsByService';
import type { ServicesState } from './services';
import type { Id } from '../index';
import type { FetchErrorsState } from './fetchErrors';
import type { StatusInfoState } from './statusInfo';

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
export type IsFetching = boolean;

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

export type DegradationNames = Array<DegradationName>;
export const initialDegradationNames = [];

export type QueryState = {
  parameters: ParametersState,
  degradationsByService: DegradationsByServiceState,
  services: ServicesState,
  fetchErrors: FetchErrorsState,
  statusInfo: StatusInfoState,
};
