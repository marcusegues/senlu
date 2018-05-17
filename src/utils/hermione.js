// @flow
import type { TimeSpanDelimiter } from '../types/reducers/query';

export const getHermioneTimeSpanFormat = (
  timeSpan: TimeSpanDelimiter
): string => `${timeSpan.date} ${timeSpan.time}`;
