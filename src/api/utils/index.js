// @flow
import type { MacAddress } from '../../types/reducers/query';

export const addParamsToUrl = (url: string, params: Object) => {
  const urlObj = new URL(url);
  Object.keys(params).forEach(key =>
    urlObj.searchParams.append(key, params[key])
  );
  return urlObj;
};

export const removeDotsFromMacAddress = (macAddress: MacAddress) =>
  macAddress.toString().replace(/\./g, '');
