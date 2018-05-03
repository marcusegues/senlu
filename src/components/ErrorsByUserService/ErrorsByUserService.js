// @flow
import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import List, { ListSubheader } from 'material-ui/List';
import { PaperCard } from '../General/PaperCard';
import * as dumbledoreApi from '../../api/dumbledore';
import { ServiceRow } from './subcomponents/ServiceRow/ServiceRow';
import { updateUIData } from '../../actions/ui';

import type {
  Fetching,
  TimeSpanDelimiter,
  SessionId,
  CustomerId,
  Services,
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
  services: Services,
  updateUIData: () => void,
  fetchingServices: Fetching,
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

    return Object.keys(this.props.services).sort(
      (a, b) =>
        ((errorsByService[b] && errorsByService[b].length) || 0) -
        ((errorsByService[a] && errorsByService[a].length) || 0)
    );
  }

  handleSelectError(service, degradation, selected: boolean) {
    const { timeSpanStart, timeSpanEnd, customerId, sessionId } = this.props;
    return dumbledoreApi
      .selectCustomerDegradation(
        customerId,
        sessionId,
        timeSpanStart,
        timeSpanEnd,
        service,
        degradation,
        selected
      )
      .then(response => response && response.status === 200);
  }

  fetchingData() {
    return this.props.fetchingServices || this.props.fetchingErrorsByService;
  }

  render() {
    const { classes } = this.props;
    const fetchingData = this.fetchingData();
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
                QoE Degradationen
                {fetchingData ? (
                  <CircularProgress style={{ margin: 10 }} />
                ) : null}
              </div>
            </ListSubheader>
          }
        >
          {fetchingData
            ? null
            : this.orderServicesByErrors().map(serviceId => (
                <ServiceRow
                  key={serviceId}
                  serviceId={serviceId}
                  service={this.props.services[serviceId]}
                  errors={this.props.errorsByService[serviceId] || []}
                  onSelectError={(selectedService, degradation, selected) =>
                    this.handleSelectError(
                      selectedService,
                      degradation,
                      selected
                    )
                  }
                />
              ))}
        </List>
      </PaperCard>
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
