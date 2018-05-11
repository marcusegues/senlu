import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { PaperCard } from '../General/PaperCard';
import { getFetchingStatusInfo, getMacAddress } from '../../selectors';

const moment = require('moment');

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

const StatusInfoInner = ({
  classes,
  softwareVersion,
  uptime,
  fetchingStatusInfo,
  macAddress,
  fetchingMacAddress,
}) => (
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
          <ListItemText>MAC: {macAddress}</ListItemText>
          <ListItemText>Softwareversion: {softwareVersion}</ListItemText>
          <ListItemText>Betriebszeit: {uptime}</ListItemText>
        </ListItem>
      )}
    </List>
  </PaperCard>
);

const mapStateToProps = state => ({
  fetchingStatusInfo: getFetchingStatusInfo(state),
  fetchingMacAddress: state.query.parameters.fetchingMacAddress,
  softwareVersion: state.query.statusInfo.softwareVersion,
  uptime: state.query.statusInfo.uptime,
  macAddress: getMacAddress(state),
});

export const StatusInfo = connect(mapStateToProps)(
  withStyles(styles)(StatusInfoInner)
);
