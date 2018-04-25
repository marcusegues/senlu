import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SelectionState,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import '../../../../../../styles/index.css';

import * as dumbledoreApi from '../../../../../../api/dumbledore';
import {
  getCustomerId,
  getSessionId,
  getTimeSpanEnd,
  getTimeSpanStart,
} from '../../../../../../selectors';
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

const SelectionCellComponent = () => {};

const CellComponent = ({ tableRow, tableColumn, style }) => {
  if (
    tableColumn.column.name === 'timeStart' ||
    tableColumn.column.name === 'timeEnd'
  ) {
    const timeString = tableRow.row[tableColumn.column.name];
    return (
      <Table.Cell>
        <div>{timeString.split(' ')[0]}</div>
        <div>{timeString.split(' ')[1]}</div>
      </Table.Cell>
    );
  }
  return <Table.Cell>{tableRow.row[tableColumn.column.name]}</Table.Cell>;
};

class ErrorListInner extends React.Component {
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
        { columnName: 'degradation', width: 200 },
        { columnName: 'count', width: 100 },
      ],
      rows: generateRows(this.props.errors),
      selection: [1],
      pendingSelectionChange: {},
    };
  }

  getErrorById(id) {
    return this.state.rows.find(error => error.id === id);
  }

  changeSelection = newSelection => {
    const { selection } = this.state;
    const {
      customerId,
      sessionId,
      timeSpanStart,
      timeSpanEnd,
      service,
    } = this.props;
    let selectionId, selectionDirection;
    if (newSelection.length > this.state.selection.length) {
      selectionId = newSelection[newSelection.length - 1];
      selectionDirection = 'select';
    } else {
      selectionId = selection[selection.length - 1];
      selectionDirection = 'unselect';
    }
    this.setState({
      pendingSelectionChange: {
        ...this.state.pendingSelectionChange,
        [selectionId]: selectionDirection,
      },
    });
    if (selectionDirection === 'select') {
      dumbledoreApi
        .selectCustomerDegradation(
          customerId,
          sessionId,
          timeSpanStart,
          timeSpanEnd,
          service,
          'ERR-15'
        )
        .then(success => {
          if (success) {
            this.setState({
              pendingSelectionChange: omit(this.state.pendingSelectionChange, [
                selectionId,
              ]),
              selection: newSelection,
            });
          } else {
            this.setState({
              pendingSelectionChange: omit(this.state.pendingSelectionChange, [
                selectionId,
              ]),
            });
          }
        });
    } else {
      // simulate an API call to unselect the box
      setTimeout(() => {
        this.setState({
          pendingSelectionChange: omit(this.state.pendingSelectionChange, [
            selectionId,
          ]),
          selection: newSelection,
        });
      }, 500);
    }
  };

  handleSelect() {
    const checked = this.state.checkbox;
    this.setState({
      checkbox: 'pending',
    });
    if (checked === 'notSelected') {
      this.props.onSelectError().then(success => {
        if (success) {
          this.setState({
            checkbox: 'selected',
          });
        } else {
          this.setState({
            checkbox: 'notSelected',
          });
        }
      });
    } else if (checked === 'selected') {
      // simulate an API call to unselect the box
      setTimeout(() => {
        this.setState({
          checkbox: 'notSelected',
        });
      }, 500);
    }
  }

  render() {
    const { rows, columns, selection, columnExtensions } = this.state;
    return (
      <Grid rows={rows} columns={columns}>
        <SelectionState
          selection={selection}
          onSelectionChange={selection => this.changeSelection(selection)}
        />
        <SortingState
          defaultSorting={[{ columnName: 'timeStart', direction: 'asc' }]}
        />
        <IntegratedSorting />

        <Table
          columnExtensions={columnExtensions}
          cellComponent={CellComponent}
        />
        <TableSelection />
        <TableHeaderRow showSortingControls />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  customerId: getCustomerId(state),
  sessionId: getSessionId(state),
  timeSpanStart: getTimeSpanStart(state),
  timeSpanEnd: getTimeSpanEnd(state),
});

export const ErrorList = connect(mapStateToProps, null)(ErrorListInner);
