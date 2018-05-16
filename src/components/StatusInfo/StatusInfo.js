// @flow
import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { PaperCard } from '../General/PaperCard';
import { SoftwareVersionText } from './SoftwareVersionText';
import { getFetchingStatusInfo, getMacAddress } from '../../selectors';
import type {
  SoftwareVersion,
  Technology,
  Uptime,
} from '../../types/reducers/query/statusInfo';
import type { IsFetching, MacAddress } from '../../types/reducers/query';
import type { AppState } from '../../types/reducers';

const moment = require('moment');

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

type StatusInfoProvidedProps = {
  classes: Object,
  softwareVersion: SoftwareVersion,
  technology: Technology,
  latestSoftwareVersion: SoftwareVersion,
  uptime: Uptime,
  fetchingStatusInfo: IsFetching,
  macAddress: MacAddress,
  fetchingMacAddress: IsFetching,
};

const StatusInfoInner = ({
  classes,
  softwareVersion,
  uptime,
  technology,
  latestSoftwareVersion,
  fetchingStatusInfo,
  macAddress,
  fetchingMacAddress,
}: StatusInfoProvidedProps) => (
  <PaperCard>
    <List
      classes={{
        root: classes.root,
      }}
      subheader={
        <ListSubheader component="div">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {`Status ${moment().format('D. MMMM YYYY')}`}
            {fetchingStatusInfo || fetchingMacAddress ? (
              <CircularProgress style={{ margin: 10 }} />
            ) : null}
          </div>
        </ListSubheader>
      }
    >
      {fetchingStatusInfo || fetchingMacAddress ? null : (
        <ListItem>
          <ListItemText>
            <div>MAC: {macAddress}</div>
          </ListItemText>
          <ListItemText>
            <SoftwareVersionText softwareVersion={softwareVersion} />
          </ListItemText>
          <ListItemText>
            <div>Betriebszeit: {uptime}</div>
          </ListItemText>
          <ListItemText>
            <div>Technology: {technology}</div>
          </ListItemText>
        </ListItem>
      )}
    </List>
  </PaperCard>
);

const mapStateToProps = (state: AppState) => ({
  fetchingStatusInfo: getFetchingStatusInfo(state),
  fetchingMacAddress: state.query.parameters.fetchingMacAddress,
  softwareVersion: state.query.statusInfo.softwareVersion,
  technology: state.query.statusInfo.technology,
  latestSoftwareVersion: state.query.statusInfo.latestSoftwareVersion,
  uptime: state.query.statusInfo.uptime,
  macAddress: getMacAddress(state),
});

export const StatusInfo = connect(mapStateToProps)(
  withStyles(styles)(StatusInfoInner)
);
