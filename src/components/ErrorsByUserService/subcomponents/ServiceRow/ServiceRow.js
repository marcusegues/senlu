import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import { TrafficLight } from '../../../../svg/TrafficLight';
import { ErrorList } from './subcomponents/ErrorList/ErrorList';

export class ServiceRow extends React.Component {
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
      onToggleExpandError,
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
              selectedDegradation={
                selectedDegradation.serviceId === serviceId
                  ? [selectedDegradation.selectedRowIndex]
                  : []
              }
              onToggleExpandError={onToggleExpandError}
              onSelectError={onSelectError}
              serviceId={serviceId}
            />
          ) : null}
        </Collapse>
      </div>
    );
  }
}
