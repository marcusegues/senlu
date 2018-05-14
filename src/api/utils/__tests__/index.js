import { addParamsToUrl, removeDotsFromMacAddress } from '../index';

const url = 'http://luna-dot-ql-sen-stag.appspot.com';

const params1 = { key1: 'val1', key2: 'val2' };

describe('Calling addParamsToUrl', () => {
  test('adds params to url', () => {
    const newUrl = addParamsToUrl(url, params1);
    expect(newUrl.searchParams.key1).toBe(params1.key1);
  });
});

const testMacAddresses = [
  '133.433.1232.2..2312',
  '.342.3242..32424',
  '324...234.2222.',
];

describe('Removing dots from mac address', () => {
  test('adds params to url', () => {
    const results = testMacAddresses.map(address =>
      removeDotsFromMacAddress(address)
    );
    expect(results[0]).toBe('133433123222312');
    expect(results[1]).toBe('342324232424');
    expect(results[2]).toBe('3242342222');
  });
});
