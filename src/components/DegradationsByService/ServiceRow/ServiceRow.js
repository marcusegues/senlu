// @flow
import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import { TrafficLight } from '../../../svg/TrafficLight';
import { DegradationList } from '../DegradationList/DegradationList';
import type { ServiceId } from '../../../types/reducers/index';
import type { OnSelectServiceDegradation } from '../DegradationsByService';
import type { Degradation, Service } from '../../../types/reducers/query/index';
import { getColor } from './util';

type ServiceRowOwnProps = {
  service: Service,
  serviceId: ServiceId,
  frontendDegradations: Array<Degradation>,
  backendDegradations: Array<Degradation>,
  onSelectDegradation: OnSelectServiceDegradation,
  selectedDegradation: any,
};

type ServiceRowState = {
  expanded: boolean,
};

export class ServiceRow extends React.Component<
  ServiceRowOwnProps,
  ServiceRowState
> {
  state = {
    expanded: false,
  };

  handleToggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      service,
      serviceId,
      frontendDegradations,
      backendDegradations,
      onSelectDegradation,
      selectedDegradation,
    } = this.props;

    return (
      <div>
        <ListItem button onClick={() => this.handleToggleExpand()}>
          <TrafficLight
            color={getColor(frontendDegradations, backendDegradations)}
          />
          <ListItemText primary={service} />

          {/* eslint-disable-next-line no-nested-ternary */}
          {frontendDegradations.length || backendDegradations.length ? (
            this.state.expanded ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          {frontendDegradations.length || backendDegradations.length ? (
            <DegradationList
              degradations={[...frontendDegradations, ...backendDegradations]}
              selectedDegradationRowIndex={
                selectedDegradation.serviceId === serviceId
                  ? selectedDegradation.selectedRowIndex
                  : -1
              }
              onSelectDegradation={onSelectDegradation}
              serviceId={serviceId}
            />
          ) : null}
        </Collapse>
      </div>
    );
  }
}
