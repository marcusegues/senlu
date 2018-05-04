import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { fetchStatusInfo } from '../../actions/statusInfo';
import { PaperCard } from '../General/PaperCard';
import { getFetchingStatusInfo, getMacAddress } from '../../selectors';

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

class StatusInfoInner extends React.Component {
  render() {
    const {
      classes,
      softwareVersion,
      uptime,
      fetchingStatusInfo,
      macAddress,
    } = this.props;
    return (
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
                Status
                {fetchingStatusInfo ? (
                  <CircularProgress style={{ margin: 10 }} />
                ) : null}
              </div>
            </ListSubheader>
          }
        >
          {fetchingStatusInfo ? null : (
            <ListItem>
              <ListItemText>MAC: {macAddress}</ListItemText>
              <ListItemText>Softwareversion: {softwareVersion}</ListItemText>
              <ListItemText>Betriebszeit: {uptime}</ListItemText>
            </ListItem>
          )}
        </List>
      </PaperCard>
    );
  }
}

const mapStateToProps = state => ({
  fetchingStatusInfo: getFetchingStatusInfo(state),
  softwareVersion: state.query.statusInfo.softwareVersion,
  uptime: state.query.statusInfo.uptime,
  macAddress: getMacAddress(state),
});

export const StatusInfo = connect(mapStateToProps)(
  withStyles(styles)(StatusInfoInner)
);
