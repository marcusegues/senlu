// @flow
import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';

type Service =
  | 'Linear TV DVB'
  | 'Linear TV OTT'
  | 'Linear TV FttH'
  | 'Replay'
  | 'Recording'
  | 'VoD'
  | 'Pay TV Linear';

type ListItemState = boolean;

type ErrorCardListState = {
  [Service]: ListItemState,
};

const initialState = {
  'Linear TV DVB': false,
  'Linear TV OTT': false,
  'Linear TV FttH': false,
};

export class ErrorCardList extends React.Component<{}, ErrorCardListState> {
  state = initialState;

  handleClick = (service: Service) => {
    this.setState({ [service]: !this.state[service] });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper>
          <List>
            <ListItem button onClick={() => this.handleClick('Linear TV DVB')}>
              <ListItemText primary="Linear TV DVB" />
              {this.state['Linear TV DVB'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state['Linear TV DVB']}
              timeout="auto"
              unmountOnExit
            >
              <div key={1} style={{ marginLeft: 10, marginRight: 10 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Error Code</TableCell>
                      <TableCell>Info</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell numeric>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Replay Abort</TableCell>
                      <TableCell>SRF1 - 10 vor 10</TableCell>
                      <TableCell>19:42-19:52</TableCell>
                      <TableCell>251</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Collapse>
            <ListItem button onClick={() => this.handleClick('Linear TV OTT')}>
              <ListItemText primary="Linear TV DVB" />
            </ListItem>

            <ListItem
              primaryText="Linear TV FttH"
              initiallyOpen={false}
              primaryTogglesNestedList
            />
            <ListItem
              primaryText="Replay"
              initiallyOpen={false}
              primaryTogglesNestedList
            />
            <ListItem
              primaryText="Recording"
              initiallyOpen={false}
              primaryTogglesNestedList
            />
            <ListItem
              primaryText="VoD"
              initiallyOpen={false}
              primaryTogglesNestedList
            />
            <ListItem
              primaryText="Pay TV Linear"
              initiallyOpen={false}
              primaryTogglesNestedList
            />
          </List>
        </Paper>
      </div>
    );
  }
}
