import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import Checkbox from 'material-ui/Checkbox';
import {
  SelectionState,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import { ErrorRow } from './subcomponents/ErrorRow';
const uuidv4 = require('uuid/v4');

const generateRows = errors =>
  errors.map((error, idx) => ({
    id: idx,
    degradation: error.degradation,
    count: error.count,
    timeStart: error.timeStart,
    timeEnd: error.timeEnd,
    version: error.version,
  }));

const TestCheck = ({ row, selected, onToggle }) => (
  <td
    style={{
      borderCollapse: 'separate',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    }}
  >
    <Checkbox />
  </td>
);

export class ErrorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'degradation', title: 'Degradation' },
        { name: 'count', title: 'Count' },
        { name: 'timeStart', title: 'Time Start' },
        { name: 'timeEnd', title: 'Time End' },
        { name: 'version', title: 'Version' },
      ],
      columnExtensions: [
        { columnName: 'count', width: 75, height: 75 },
        { columnName: 'degradation', width: 150, height: 75 },
        { columnName: 'timeStart', width: 150, height: 75 },
        { columnName: 'timeEnd', width: 150, height: 75 },
      ],
      rows: generateRows(this.props.errors),
      selection: [1],
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { rows, columns, selection, columnExtensions } = this.state;
    return (
      <Grid rows={rows} columns={columns}>
        <SortingState
          defaultSorting={[{ columnName: 'timeStart', direction: 'asc' }]}
        />
        <SelectionState
          selection={selection}
          onSelectionChange={this.changeSelection}
        />

        <IntegratedSorting />
        <Table columnExtensions={columnExtensions} />
        <TableSelection cellComponent={TestCheck} />
        <TableHeaderRow showSortingControls />
      </Grid>
    );
  }
}
