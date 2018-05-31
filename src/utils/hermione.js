// @flow
import type { TimeSpanDelimiter } from '../types/reducers/query';

const getGenericTimeSpanFormat = (timeSpan: TimeSpanDelimiter): string =>
  `${timeSpan.date} ${timeSpan.time}`;

export const getHermioneTimeSpanFormat = (
  timeSpan: TimeSpanDelimiter
): string => getGenericTimeSpanFormat(timeSpan);

export const getHarryTimeSpanFormat = (timeSpan: TimeSpanDelimiter): string =>
  getGenericTimeSpanFormat(timeSpan);
