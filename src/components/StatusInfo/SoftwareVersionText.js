// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isSoftwareVersionUpdated } from './util';
import type { SoftwareVersion } from '../../types/reducers/query/statusInfo';
import type { AppState } from '../../types/reducers';

type SoftwareVersionTextOwnProps = {
  softwareVersion: SoftwareVersion,
  latestSoftwareVersion: SoftwareVersion,
};

export const SoftwareVersionTextInner = ({
  softwareVersion,
  latestSoftwareVersion,
}: SoftwareVersionTextOwnProps) => (
  <div
    style={{
      color: isSoftwareVersionUpdated(softwareVersion, latestSoftwareVersion)
        ? 'black'
        : 'red',
    }}
  >
    Softwareversion: {softwareVersion}
  </div>
);

const mapStateToProps = (state: AppState) => ({
  softwareVersion: state.query.statusInfo.softwareVersion,
  latestSoftwareVersion: state.query.statusInfo.latestSoftwareVersion,
});

export const SoftwareVersionText = connect(mapStateToProps)(
  SoftwareVersionTextInner
);
