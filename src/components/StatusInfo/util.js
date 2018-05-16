// @flow
import type { SoftwareVersion } from '../../types/reducers/query/statusInfo';

export const isSoftwareVersionUpdated = (
  currentSoftwareVersion: SoftwareVersion,
  latestSoftwareVersion: SoftwareVersion
): boolean => {
  return true;
};
