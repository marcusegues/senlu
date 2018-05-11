import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {
  getDegradationNameById,
  getError,
} from '../../../../../../../selectors';

const uuidv4 = require('uuid/v4');

class ErrorListRowDetailInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'degradation', title: 'Fehlerbild' },
        { name: 'service', title: 'Service' },
        { name: 'proportion', title: 'Anteil' },
      ],
      columnExtensions: [{ columnName: 'degradation', width: 275 }],
      rows: this.generateRows(
        this.props.error.proportions,
        this.props.services
      ),
    };
  }

  generateRows(proportions, services) {
    return proportions.map(data => ({
      degradation: this.props.getDegradationNameById(data.error_label),
      service: services[data.service],
      proportion: data.proportion,
    }));
  }

  render() {
    const { error } = this.props;
    const { rows, columns, columnExtensions } = this.state;
    return (
      <List>
        <ListSubheader>Informationen</ListSubheader>
        <ListItem key={uuidv4()}>
          <ListItemText primary={`Version: ${error.version}`} />
          <ListItemText primary={`Uptime: ${error.uptime}`} />
        </ListItem>
        <Divider />
        <ListSubheader>Logs</ListSubheader>

        {error.logs.map(log => (
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

const mapStateToProps = (state, ownProps) => ({
  error: getError(state, ownProps.serviceId, ownProps.row.id),
  services: state.query.services.services,
  getDegradationNameById: degradationId =>
    getDegradationNameById(state, degradationId),
});

export const ErrorListRowDetail = connect(mapStateToProps, null)(
  ErrorListRowDetailInner
);
