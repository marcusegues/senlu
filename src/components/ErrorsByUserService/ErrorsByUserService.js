// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import * as dumbledoreApi from '../../api/dumbledore';
import { ServiceRow } from './subcomponents/ServiceRow/ServiceRow';
import { updateUIData } from '../../actions/ui';

import type {
  Fetching,
  TimeSpanDelimiter,
  SessionId,
  MacAddress,
} from '../../types/reducers/query';
import {
  getErrorsByService,
  getFetchingErrorsByService,
  getFetchingUserServices,
  getSessionId,
  getTimeSpanEnd,
  getTimeSpanStart,
  getUserServices,
} from '../../selectors';
import { getMacAddress } from '../../selectors/query/parameters';

type ErrorListCardProps = {
  errorsByService: Object,
  userServices: Array<any>,
  updateUIData: () => void,
  fetchingUserServices: Fetching,
  fetchingErrorsByService: Fetching,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  macAddress: MacAddress,
  sessionId: SessionId,
  classes: Object,
};

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

class ErrorsByUserServiceInner extends React.Component<ErrorListCardProps, {}> {
  componentDidMount() {
    this.props.updateUIData();
  }

  formatData() {
    const data = {};
    this.props.userServices.forEach(service => {
      data[service] = this.props.errorsByService[service] || [];
    });
    return data;
  }

  handleSelectError(userService, errorCode) {
    const { timeSpanStart, timeSpanEnd, macAddress, sessionId } = this.props;
    return dumbledoreApi
      .selectCustomerDegradation(
        macAddress,
        sessionId,
        timeSpanStart,
        timeSpanEnd,
        userService,
        errorCode
      )
      .then(response => response && response.status === 200);
  }

  fetchingData() {
    return (
      this.props.fetchingUserServices || this.props.fetchingErrorsByService
    );
  }

  render() {
    const { classes } = this.props;
    const data = this.formatData();
    const fetchingData = this.fetchingData();
    return (
      <Paper
        style={{
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 15,
        }}
      >
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
                QoE Degradations
                {fetchingData ? (
                  <CircularProgress style={{ margin: 10 }} />
                ) : null}
              </div>
            </ListSubheader>
          }
        >
          {fetchingData
            ? null
            : Object.keys(data).map(service => (
                <ServiceRow
                  key={service}
                  service={service}
                  errors={data[service]}
                  onSelectError={(userService, errorCode) =>
                    this.handleSelectError(userService, errorCode)
                  }
                />
              ))}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  macAddress: getMacAddress(state),
  sessionId: getSessionId(state),
  timeSpanStart: getTimeSpanStart(state),
  timeSpanEnd: getTimeSpanEnd(state),
  fetchingErrorsByService: getFetchingErrorsByService(state),
  fetchingUserServices: getFetchingUserServices(state),
  errorsByService: getErrorsByService(state),
  userServices: getUserServices(state),
});

const mapDispatchToProps = dispatch => ({
  updateUIData: () => dispatch(updateUIData()),
});

export const ErrorsByUserService = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ErrorsByUserServiceInner)
);
