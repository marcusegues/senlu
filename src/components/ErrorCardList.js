// @flow
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

type Service =
  | 'Linear TV DVB'
  | 'Linear TV OTT'
  | 'Linear TV FttH'
  | 'Replay'
  | 'Recording'
  | 'VoD'
  | 'Pay TV Linear';

type ListItemState = 'open' | 'closed';

type ErrorCardListState = {
  [Service]: ListItemState,
};

const initialState = {
  'Linear TV DVB': 'closed',
  'Linear TV OTT': 'closed',
  'Linear TV FttH': 'closed',
};

export class ErrorCardList extends React.Component<{}, ErrorCardListState> {
  state = initialState;

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            width: '70%',
          }}
        >
          <List>
            <ListItem
              primaryText="Linear TV DVB"
              initiallyOpen={false}
              primaryTogglesNestedList
              nestedItems={[
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Error Code</TableHeaderColumn>
                      <TableHeaderColumn>Info</TableHeaderColumn>
                      <TableHeaderColumn>Time</TableHeaderColumn>
                      <TableHeaderColumn>Count</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableRowColumn>Replay Abort</TableRowColumn>
                      <TableRowColumn>SRF1 - 10 vor 10</TableRowColumn>
                      <TableRowColumn>19:42-19:52</TableRowColumn>
                      <TableRowColumn>251</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>,
              ]}
            />
            <ListItem
              primaryText="Linear TV OTT"
              initiallyOpen={false}
              primaryTogglesNestedList
            />
            <ListItem
              primaryText="Linear TV FttH"
              initiallyOpen={false}
              primaryTogglesNestedList
              nestedItems={[
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Error Code</TableHeaderColumn>
                      <TableHeaderColumn>Info</TableHeaderColumn>
                      <TableHeaderColumn>Time</TableHeaderColumn>
                      <TableHeaderColumn>Count</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableRowColumn>Picture Freeze</TableRowColumn>
                      <TableRowColumn>ARD - Tagesschau</TableRowColumn>
                      <TableRowColumn>19:54 - 20:05</TableRowColumn>
                      <TableRowColumn>1337</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>,
              ]}
            />
          </List>
        </Card>
      </div>
    );
  }
}
