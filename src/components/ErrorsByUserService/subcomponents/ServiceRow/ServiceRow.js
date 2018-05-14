// @flow
import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import { TrafficLight } from '../../../../svg/TrafficLight';
import { ErrorList } from './subcomponents/ErrorList/ErrorList';
import type { ServiceId } from '../../../../types/reducers';
import type { OnSelectServiceError } from '../../ErrorsByUserService';
import type { Degradation, Service } from '../../../../types/reducers/query';

type ServiceRowOwnProps = {
  service: Service,
  serviceId: ServiceId,
  errors: Array<Degradation>,
  onSelectError: OnSelectServiceError,
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
      errors,
      onSelectError,
      selectedDegradation,
    } = this.props;

    return (
      <div>
        <ListItem button onClick={() => this.handleToggleExpand()}>
          {(() => {
            const len = errors.length;
            switch (true) {
              case len === 0:
                return <TrafficLight color="green" />;
              case len < 10:
                return <TrafficLight color="yellow" />;
              default:
                return <TrafficLight color="red" />;
            }
          })()}
          <ListItemText primary={service} />

          {/* eslint-disable-next-line no-nested-ternary */}
          {errors.length ? (
            this.state.expanded ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          {errors.length ? (
            <ErrorList
              errors={errors}
              selectedDegradationRowIndex={
                selectedDegradation.serviceId === serviceId
                  ? [selectedDegradation.selectedRowIndex]
                  : []
              }
              onSelectError={onSelectError}
              serviceId={serviceId}
            />
          ) : null}
        </Collapse>
      </div>
    );
  }
}
