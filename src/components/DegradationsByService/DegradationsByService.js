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
  getFrontendDegradationsByService,
  getFetchingFrontendDegradationsByService,
  getFetchingServices,
  getSessionId,
  getTimeSpanEnd,
  getTimeSpanStart,
  getServices,
  getMacAddress,
  getCustomerId,
} from '../../selectors';
import {
  fetchBackendDegradations,
  fetchDegradationNames,
} from '../../actions/degradationsByService';
import type { SelectedDegradation } from '../../types/reducers/query/degradationsByService';
import { initialSelectedDegradation } from '../../types/reducers/query/degradationsByService';
import type {
  DegradationId,
  Index,
  SelectedRowIndex,
  ServiceId,
} from '../../types/reducers';

type DegradationsByServiceProps = {
  frontendDegradationsByService: Object,
  services: Services,
  updateUIData: () => void,
  fetchingServices: IsFetching,
  fetchingFrontendDegradationsByService: IsFetching,
  fetchDegradationNames: () => void,
  fetchBackendDegradationsByMac: (macAddress: MacAddress) => void,
  getBackendDegradations: () => void,
  selectedDegradation: SelectedDegradation,
  setSelectedDegradation: SelectedDegradation => void,
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  customerId: CustomerId,
  sessionId: SessionId,
  classes: Object,
};

export type OnSelectServiceDegradation = (
  selectedServiceId: ServiceId,
  degradationId: DegradationId,
  selectedRowIndex: Index,
  selected: boolean
) => Promise<boolean>;

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

class DegradationsByServiceInner extends React.Component<
  DegradationsByServiceProps,
  {}
> {
  componentDidMount() {
    this.props.updateUIData();
    this.props.getBackendDegradations();
    this.props.fetchDegradationNames();
  }

  orderServicesByDegradations() {
    const { frontendDegradationsByService } = this.props;

    const res = Object.keys(this.props.services).sort(
      (a, b) =>
        ((frontendDegradationsByService[b] &&
          frontendDegradationsByService[b].length) ||
          0) -
        ((frontendDegradationsByService[a] &&
          frontendDegradationsByService[a].length) ||
          0)
    );
    return res;
  }

  handleSelectDegradation(
    serviceId: ServiceId,
    degradationId: DegradationId,
    selectedRowIndex: Index,
    selected: boolean
  ) {
    const { timeSpanStart, timeSpanEnd, customerId, sessionId } = this.props;

    return dumbledoreApi
      .selectCustomerDegradation(
        customerId,
        sessionId,
        timeSpanStart,
        timeSpanEnd,
        serviceId,
        degradationId,
        selected
      )
      .then(response => response && response.status === 200)
      .then(success => {
        if (success) {
          if (selected) {
            this.props.setSelectedDegradation({
              serviceId,
              degradationId,
              selectedRowIndex,
            });
          } else {
            this.props.setSelectedDegradation(initialSelectedDegradation);
          }
          return true;
        }
        return false;
      });
  }

  fetchingData() {
    return (
      this.props.fetchingServices ||
      this.props.fetchingFrontendDegradationsByService
    );
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
            : this.orderServicesByDegradations().map(serviceId => (
                <ServiceRow
                  key={serviceId}
                  selectedDegradation={this.props.selectedDegradation}
                  serviceId={serviceId}
                  service={this.props.services[serviceId]}
                  degradations={
                    this.props.frontendDegradationsByService[serviceId] || []
                  }
                  onSelectDegradation={(
                    selectedServiceId: ServiceId,
                    degradationId: DegradationId,
                    selectedRowIndex: SelectedRowIndex,
                    selected: boolean
                  ) =>
                    this.handleSelectDegradation(
                      selectedServiceId,
                      degradationId,
                      selectedRowIndex,
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
  fetchingFrontendDegradationsByService: getFetchingFrontendDegradationsByService(
    state
  ),
  fetchingServices: getFetchingServices(state),
  frontendDegradationsByService: getFrontendDegradationsByService(state),
  services: getServices(state),
  selectedDegradation: state.query.degradationsByService.selectedDegradation,
});

const mapDispatchToProps = dispatch => ({
  updateUIData: () => dispatch(updateUIData()),
  fetchDegradationNames: () => dispatch(fetchDegradationNames()),
  getBackendDegradations: () => dispatch(fetchBackendDegradations()),
  setSelectedDegradation: selectedDegradation =>
    dispatch({ type: 'SET_SELECTED_DEGRADATION', selectedDegradation }),
});

export const DegradationsByService = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DegradationsByServiceInner));
