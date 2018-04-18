import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Table, { TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import { ErrorRow } from './subcomponents/ErrorRow';
import { TrafficLightGreen } from '../../../../icons/svg/trafficLightGreen';

const uuidv4 = require('uuid/v4');

export class ServiceRow extends React.Component {
  state = {
    expanded: false,
  };

  handleToggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { service, errors, onSelectError } = this.props;
    if (typeof errors === 'string') {
      // when there are no errors, errors is '"No logs for timespan."
      return (
        <ListItem>
          <ListItemText primary="No results." />
        </ListItem>
      );
    }
    return (
      <React.Fragment>
        <ListItem button onClick={() => this.handleToggleExpand()}>
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
        {errors.length ? (
          <Collapse in={this.state.expanded} timeout="auto">
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Error Code</TableCell>
                    <TableCell numeric>Count</TableCell>
                    <TableCell>Time Start</TableCell>
                    <TableCell>Time End</TableCell>
                    <TableCell>Info</TableCell>
                  </TableRow>
                </TableHead>
                {errors &&
                  errors.map(([errorCode, count, timeStart, timeEnd, info]) => (
                    <ErrorRow
                      key={uuidv4()}
                      errorCode={errorCode}
                      count={count}
                      timeStart={timeStart}
                      timeEnd={timeEnd}
                      info={info}
                      onSelectError={() => onSelectError(service, errorCode)}
                    />
                  ))}
              </Table>
            </div>
          </Collapse>
        ) : null}
      </React.Fragment>
    );
  }
}
