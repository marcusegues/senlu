// @flow

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
