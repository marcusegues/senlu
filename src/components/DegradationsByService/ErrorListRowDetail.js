// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { getDegradationNameById, getServices } from '../../selectors/index';
import type {
  DegradationName,
  Services,
  Proportions,
  Logs,
  Version,
} from '../../types/reducers/query';
import type { AppState, Id } from '../../types/reducers/index';
import type { Uptime } from '../../types/reducers/query/statusInfo';

const uuidv4 = require('uuid/v4');

type Column = {
  name: string,
  title: string,
};

type ErrorListRowDetailRow = {
  degradation: string,
  service: string,
  proportion: number,
};

type ColumnExtension = {
  columnName: string,
  width: number,
};

type ErrorListRowDetailProvidedProps = {
  services: Services,
  getDegradationNameById: (degradationId: Id) => DegradationName,
};

type ErrorListRowDetailOwnProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  serviceId: Id,
  // eslint-disable-next-line react/no-unused-prop-types
  version: Version,
  uptime: Uptime,
  logs: Logs,
  proportions: Proportions,
};

type ErrorListRowDetailState = {
  columns: Array<Column>,
  rows: Array<ErrorListRowDetailRow>,
  columnExtensions: Array<ColumnExtension>,
};

class ErrorListRowDetailInner extends React.Component<
  ErrorListRowDetailProvidedProps & ErrorListRowDetailOwnProps,
  ErrorListRowDetailState
> {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'degradation', title: 'Fehlerbild' },
        { name: 'service', title: 'Service' },
        { name: 'proportion', title: 'Anteil' },
      ],
      rows: this.generateRows(this.props.proportions, this.props.services),
      columnExtensions: [{ columnName: 'degradation', width: 275 }],
    };
  }

  generateRows(
    proportions: Proportions,
    services: Services
  ): Array<ErrorListRowDetailRow> {
    return proportions.map(data => ({
      degradation: this.props.getDegradationNameById(data.error_label),
      service: services[data.service],
      proportion: data.proportion,
    }));
  }

  render() {
    const { version, uptime, logs } = this.props;
    const { rows, columns, columnExtensions } = this.state;
    return (
      <List>
        <ListSubheader>Informationen</ListSubheader>
        <ListItem key={uuidv4()}>
          <ListItemText primary={`Version: ${version}`} />
          <ListItemText primary={`Uptime: ${uptime}`} />
        </ListItem>
        <Divider />
        <ListSubheader>Logs</ListSubheader>

        {logs.map(log => (
          <ListItem key={uuidv4()}>
            <ListItemText primary={log} />
          </ListItem>
        ))}
        <Divider />
        <ListSubheader>Degradationen in Zeitspanne</ListSubheader>
        <Grid rows={rows} columns={columns}>
          <Table columnExtensions={columnExtensions} />
          <TableHeaderRow />
        </Grid>
      </List>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  services: getServices(state),
  getDegradationNameById: degradationId =>
    getDegradationNameById(state, degradationId),
});

export const ErrorListRowDetail = connect(mapStateToProps, null)(
  ErrorListRowDetailInner
);
