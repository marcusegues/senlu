// @flow
import { getHermioneTimeSpanFormat } from '../hermione';

const moment = require('moment');

const dateTime = moment('2013-02-08 09:30');

const timeSpan1 = {
  date: dateTime.format('YYYY-MM-DD'),
  time: dateTime.format('HH:mm'),
};

describe('getHermioneTimeSpanFormat', () => {
  test('correctly formats timeSpan1', () => {
    expect(getHermioneTimeSpanFormat(timeSpan1)).toBe('2013-02-08 09:30:00');
  });
});
