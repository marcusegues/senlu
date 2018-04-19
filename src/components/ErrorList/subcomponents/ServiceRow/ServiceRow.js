import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Table, {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from 'material-ui/Table';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import { ErrorRow } from './subcomponents/ErrorRow';
import { TrafficLight } from '../../../../svg/TrafficLight';
import { CustomTableCell } from '../../../Table/CustomTableCell';

const uuidv4 = require('uuid/v4');

const styles = theme => ({
  row: {
    height: 40,
  },
});

export class ServiceRowInner extends React.Component {
  state = {
    expanded: false,
  };

  handleToggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { service, errors, onSelectError, classes } = this.props;
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
        {errors.length ? (
          <Collapse in={this.state.expanded} timeout="auto">
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Table>
                <TableHead>
                  <TableRow
                    classes={{
                      root: classes.row,
                    }}
                  >
                    <CustomTableCell>Select Degradation</CustomTableCell>
                    <CustomTableCell>Error Code</CustomTableCell>
                    <CustomTableCell numeric>Count</CustomTableCell>
                    <CustomTableCell>Time Start</CustomTableCell>
                    <CustomTableCell>Time End</CustomTableCell>
                    <CustomTableCell>Info</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {errors &&
                    errors.map(
                      ([errorCode, count, timeStart, timeEnd, info], idx) => (
                        <ErrorRow
                          key={uuidv4()}
                          errorCode={errorCode}
                          count={count}
                          timeStart={timeStart}
                          timeEnd={timeEnd}
                          info={info}
                          onSelectError={() =>
                            onSelectError(service, errorCode)
                          }
                        />
                      )
                    )}
                </TableBody>
              </Table>
            </div>
          </Collapse>
        ) : null}
      </React.Fragment>
    );
  }
}

export const ServiceRow = withStyles(styles)(ServiceRowInner);
