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
  degradations: Array<Degradation>,
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
      degradations,
      onSelectDegradation,
      selectedDegradation,
    } = this.props;

    return (
      <div>
        <ListItem button onClick={() => this.handleToggleExpand()}>
          <TrafficLight color={getColor(degradations)} />
          <ListItemText primary={service} />

          {/* eslint-disable-next-line no-nested-ternary */}
          {degradations.length ? (
            this.state.expanded ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          {degradations.length ? (
            <DegradationList
              degradations={degradations}
              selectedDegradationRowIndex={
                selectedDegradation.serviceId === serviceId
                  ? [selectedDegradation.selectedRowIndex]
                  : []
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
