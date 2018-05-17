// @flow
import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import List, { ListSubheader } from 'material-ui/List';
import { PaperCard } from '../General/PaperCard';
import * as dumbledoreApi from '../../api/dumbledore';
import { ServiceRow } from './ServiceRow/ServiceRow';
import { updateUIData } from '../../actions/ui';

import type {
  IsFetching,
  TimeSpanDelimiter,
  SessionId,
  CustomerId,
  Services,
  MacAddress,
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
import { fetchDegradationNames } from '../../actions/errorsByService';
import type { SelectedDegradation } from '../../types/reducers/query/errorsByService';
import { initialSelectedDegradation } from '../../types/reducers/query/errorsByService';
import type {
  DegradationId,
  Index,
  SelectedRowIndex,
  ServiceId,
} from '../../types/reducers';
import { getBackendDegradationsByMac } from '../../api/harry';
import { getHermioneTimeSpanFormat } from '../../utils/hermione';

const moment = require('moment');

type ErrorListCardProps = {
  errorsByService: Object,
  services: Services,
  updateUIData: () => void,
  fetchingServices: IsFetching,
  fetchingErrorsByService: IsFetching,
  fetchDegradationNames: () => void,
  fetchBackendDegradationsByMac: (macAddress: MacAddress) => void,
  selectedDegradation: SelectedDegradation,
  setSelectedDegradation: SelectedDegradation => void,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  customerId: CustomerId,
  sessionId: SessionId,
  classes: Object,
};

export type OnSelectServiceError = (
  selectedServiceId: ServiceId,
  degradationId: DegradationId,
  selectRowIndex: Index
) => Promise<boolean>;

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

class ErrorsByUserServiceInner extends React.Component<ErrorListCardProps, {}> {
  componentDidMount() {
    this.props.updateUIData();
    const mockedTimeSpanStart = moment('2018-04-27 01:22:16');
    const mockedTimeSpanEnd = moment('2018-04-27 02:34:29');
    getBackendDegradationsByMac(
      this.props.macAddress,
      getHermioneTimeSpanFormat({
        date: mockedTimeSpanStart.format('YYYY-MM-DD'),
        time: mockedTimeSpanStart.format('HH:mm:ss'),
      }),
      getHermioneTimeSpanFormat({
        date: mockedTimeSpanEnd.format('YYYY-MM-DD'),
        time: mockedTimeSpanEnd.format('HH:mm:ss'),
      })
    ).then(data => console.log('HARRY DATA', data));
    this.props.fetchDegradationNames();
  }

  orderServicesByErrors() {
    const { errorsByService } = this.props;

    const res = Object.keys(this.props.services).sort(
      (a, b) =>
        ((errorsByService[b] && errorsByService[b].length) || 0) -
        ((errorsByService[a] && errorsByService[a].length) || 0)
    );
    return res;
  }

  handleSelectError(
    serviceId: ServiceId,
    degradationId: DegradationId,
    selectRowIndex: SelectedRowIndex
  ) {
    const selected = selectRowIndex !== -1;
    const {
      timeSpanStart,
      timeSpanEnd,
      customerId,
      sessionId,
      selectedDegradation,
    } = this.props;
    const needToUnselectOther = !!(
      selectedDegradation.serviceId &&
      selectedDegradation.degradationId &&
      (serviceId !== selectedDegradation.serviceId ||
        degradationId !== selectedDegradation.degradationId)
    );
    const unselect =
      needToUnselectOther && selectedDegradation !== 'noSelection'
        ? dumbledoreApi
            .selectCustomerDegradation(
              customerId,
              sessionId,
              timeSpanStart,
              timeSpanEnd,
              selectedDegradation.serviceId,
              selectedDegradation.degradationId,
              false
            )
            .then(response => response && response.status === 200)
        : Promise.resolve(true);

    return Promise.all([
      unselect,
      dumbledoreApi
        .selectCustomerDegradation(
          customerId,
          sessionId,
          timeSpanStart,
          timeSpanEnd,
          serviceId,
          degradationId,
          selected
        )
        .then(response => response && response.status === 200),
    ]).then(([successUnselectOther, successCurrent]) => {
      if (successUnselectOther && successCurrent) {
        this.props.setSelectedDegradation(
          selected
            ? { serviceId, degradationId, selectedRowIndex: selectRowIndex }
            : initialSelectedDegradation
        );
        return true;
      }
      // something went wrong with checking or unchecking so handle this (actually request a simpler API so
      // two requests don't have to be made and this whole logic can be refactored
      return false;
    });
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
                  selectedDegradation={this.props.selectedDegradation}
                  serviceId={serviceId}
                  service={this.props.services[serviceId]}
                  errors={this.props.errorsByService[serviceId] || []}
                  onSelectError={(
                    selectedServiceId: ServiceId,
                    degradationId: DegradationId,
                    selectRowIndex: SelectedRowIndex
                  ) =>
                    this.handleSelectError(
                      selectedServiceId,
                      degradationId,
                      selectRowIndex
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
  selectedDegradation: state.query.errorsByService.selectedDegradation,
});

const mapDispatchToProps = dispatch => ({
  updateUIData: () => dispatch(updateUIData()),
  fetchDegradationNames: () => dispatch(fetchDegradationNames()),
  fetchBackendDegradationsByMac: (macAddress: MacAddress) =>
    dispatch(getBackendDegradationsByMac(macAddress)),
  setSelectedDegradation: selectedDegradation =>
    dispatch({ type: 'SET_SELECTED_DEGRADATION', selectedDegradation }),
});

export const ErrorsByUserService = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ErrorsByUserServiceInner)
);
