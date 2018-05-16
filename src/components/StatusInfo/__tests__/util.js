// @flow
import { initialSoftwareVersion } from '../../../types/reducers/query/statusInfo';
import { isSoftwareVersionUpdated } from '../util';
import type {SoftwareVersion} from "../../../types/reducers/query/statusInfo";

const currentSoftwareVersion1: SoftwareVersion = '1.14.3-stb';
const latestSoftwareVersion1: SoftwareVersion = '1.14.3-stb';
const latestSoftwareVersion2: SoftwareVersion = '1.13.3';

describe('isSoftwareVersionUpdated', () => {
  test('returns null if latest version is initial software version', () => {
    expect(
      isSoftwareVersionUpdated(currentSoftwareVersion1, initialSoftwareVersion)
    ).toBe(null);
  });

  test('returns true if latest version same as current version', () => {
    expect(
      isSoftwareVersionUpdated(currentSoftwareVersion1, latestSoftwareVersion1)
    ).toBe(true);
  });

  test('returns true if latest version is not same as current version', () => {
    expect(
      isSoftwareVersionUpdated(currentSoftwareVersion1, latestSoftwareVersion2)
    ).toBe(false);
  });

  test('returns null if both inputs are initial software version', () => {
    expect(
      isSoftwareVersionUpdated(initialSoftwareVersion, initialSoftwareVersion)
    ).toBe(null);
  });
});
