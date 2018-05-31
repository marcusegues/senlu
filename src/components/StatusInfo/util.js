// @flow
import type { SoftwareVersion } from '../../types/reducers/query/statusInfo';
import {initialSoftwareVersion} from "../../types/reducers/query/statusInfo";

export const isSoftwareVersionUpdated = (
  currentSoftwareVersion: SoftwareVersion,
  latestSoftwareVersion: SoftwareVersion
): ?boolean => {
  if (latestSoftwareVersion === initialSoftwareVersion) {
    return null;
  }
  return latestSoftwareVersion === currentSoftwareVersion;
};
