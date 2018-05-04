import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { getError } from '../../../../../../../selectors';

const uuidv4 = require('uuid/v4');

const generateRows = proportions =>
  proportions.map(data => ({
    degradation: data.error_label,
    service: data.service,
    proportion: data.proportion,
  }));

class ErrorListRowDetailInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'degradation', title: 'Fehlerbild' },
        { name: 'service', title: 'Service' },
        { name: 'proportion', title: 'Proportion' },
      ],
      rows: generateRows(this.props.error.proportions),
    };
  }
  render() {
    const { error } = this.props;
    const { rows, columns } = this.state;
    return (
      <List>
        <ListSubheader>Static Info</ListSubheader>
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
        <ListSubheader>LIME Output</ListSubheader>
        <Grid rows={rows} columns={columns}>
          <Table />
          <TableHeaderRow />
        </Grid>
      </List>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  error: getError(state, ownProps.serviceId, ownProps.row.id),
});

export const ErrorListRowDetail = connect(mapStateToProps, null)(
  ErrorListRowDetailInner
);
