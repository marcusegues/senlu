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
  CustomerId,
} from '../../types/reducers/query';
import {
  getErrorsByService,
  getFetchingErrorsByService,
  getFetchingServices,
  getSessionId,
  getTimeSpanEnd,
  getTimeSpanStart,
  getServices,
  getMacAddress,
  getCustomerId,
} from '../../selectors';

type ErrorListCardProps = {
  errorsByService: Object,
  services: Array<any>,
  updateUIData: () => void,
  fetchingUserServices: Fetching,
  fetchingErrorsByService: Fetching,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  customerId: CustomerId,
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

  orderServicesByErrors() {
    const { errorsByService } = this.props;
    return this.props.services.sort(
      (a, b) =>
        ((errorsByService[b] && errorsByService[b].length) || 0) -
        ((errorsByService[a] && errorsByService[a].length) || 0)
    );
  }

  handleSelectError(service, errorCode) {
    const { timeSpanStart, timeSpanEnd, customerId, sessionId } = this.props;
    return dumbledoreApi
      .selectCustomerDegradation(
        customerId,
        sessionId,
        timeSpanStart,
        timeSpanEnd,
        service,
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
            : this.orderServicesByErrors().map(service => (
                <ServiceRow
                  key={service}
                  service={service}
                  errors={this.props.errorsByService[service] || []}
                  onSelectError={(selectedService, degradation) =>
                    this.handleSelectError(selectedService, degradation)
                  }
                />
              ))}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  customerId: getCustomerId(state),
  macAddress: getMacAddress(state),
  sessionId: getSessionId(state),
  timeSpanStart: getTimeSpanStart(state),
  timeSpanEnd: getTimeSpanEnd(state),
  fetchingErrorsByService: getFetchingErrorsByService(state),
  fetchingServices: getFetchingServices(state),
  errorsByService: getErrorsByService(state),
  services: getServices(state),
});

const mapDispatchToProps = dispatch => ({
  updateUIData: () => dispatch(updateUIData()),
});

export const ErrorsByUserService = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ErrorsByUserServiceInner)
);
