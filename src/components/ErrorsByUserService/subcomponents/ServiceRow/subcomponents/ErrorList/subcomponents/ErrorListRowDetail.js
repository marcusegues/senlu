import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { getError } from '../../../../../../../selectors';
const uuidv4 = require('uuid/v4');

const ErrorListRowDetailInner = ({ error }) => {
  return (
    <List>
      <ListSubheader>{`Static Info`}</ListSubheader>
      <ListItem key={uuidv4()}>
        <ListItemText primary={`Version: ${error.version}`} />
        <ListItemText primary={`Uptime: ${error.uptime}`} />
      </ListItem>
      <Divider />
      <ListSubheader>{`Logs`}</ListSubheader>

      {error.logs.map(log => (
        <ListItem key={uuidv4()}>
          <ListItemText primary={log} />
        </ListItem>
      ))}
      <Divider />
      <ListSubheader>{`LIME Output`}</ListSubheader>
      <Divider />
    </List>
  );
};

const mapStateToProps = (state, ownProps) => ({
  error: getError(state, ownProps.serviceId, ownProps.row.id),
});

export const ErrorListRowDetail = connect(mapStateToProps, null)(
  ErrorListRowDetailInner
);
