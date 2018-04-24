// @flow
import type { ParametersState } from './parameters';
import type { HermioneState } from './hermione';
import type { DumbledoreState } from './dumbledore';

export type UserService =
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

export type UserServices = Array<UserService>;

export const userServices: UserServices = [
  'Linear TV OTT',
  'Linear TV FttH',
  'Replay',
  'Recordings',
  'VoD',
  'Pay TV Linear',
  'Radio',
  'EPG',
  'Teletext',
  'Linear TV DVB',
  'Subtitles',
  'Trick modes',
  'Profiles',
  'Channellist',
  'Parental control',
  'Search ( text )',
  'Launcher',
  'Multiroom Scearios',
  'System Settings',
  'Standby mode',
  'Low power mode',
  'First install',
  'HbbTV',
  'Recommendations',
  'Mypage',
  'MyChannel',
  'Factor Reset',
  'Audio Selection',
  'Home Network',
  'Internet Access',
  'Remote Control Unit',
  'Google Managed Services (GMS) other',
  'GMS Youtube',
  'GMS Play Movies',
  'GMS Music',
  'GMS Voice Search',
  'GMS Assistant',
  'GMS Software update',
  'GMS Playstore',
  'Live Tv App',
];

// Parameters
export type CustomerId = number;
export type SessionId = number;
export type TimeSpanDelimiter = { date: string, time: string };

// UI flags
export type Fetching = boolean;

// API response
export type ErrorCode = any;
export type Count = number;
export type Error = [ErrorCode, number, string, string, string];
export type ErrorArray = Array<Error>;
export type ErrorsByService = { [UserService]: ErrorArray };

export type QueryState = {
  parameters: ParametersState,
  hermione: HermioneState,
  dumbledore: DumbledoreState,
};
