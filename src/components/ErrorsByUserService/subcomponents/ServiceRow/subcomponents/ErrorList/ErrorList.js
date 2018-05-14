// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SelectionState,
  SortingState,
  IntegratedSorting,
  RowDetailState,
} from '@devexpress/dx-react-grid';
import '../../../../../../styles/index.css';
import { CellComponent } from './subcomponents/CellComponent';
import { SelectionCell } from './subcomponents/SelectionCell';
import { getDegradationNameById } from '../../../../../../selectors';
import { ErrorListRowDetail } from './subcomponents/ErrorListRowDetail';
import type {
  Count,
  Degradation,
  DegradationArray,
  DegradationName,
  TimeString,
  Version,
} from '../../../../../../types/reducers/query';
import type {
  DegradationId,
  Index,
  SelectedRowIndex,
  ServiceId,
} from '../../../../../../types/reducers';
import type { OnSelectServiceError } from '../../../../ErrorsByUserService';

type Column = {
  name: string,
  title: string,
};

export type ErrorListRow = {
  id: Index,
  degradation: DegradationName,
  count: Count,
  timeStart: TimeString,
  timeEnd: TimeString,
  version: Version,
};

type ColumnExtension = {
  columnName: string,
  width: number,
};

type ErrorListState = {
  columns: Array<Column>,
  rows: Array<ErrorListRow>,
  columnExtensions: Array<ColumnExtension>,
  selectedRowIndex: Array<SelectedRowIndex>,
};

type ErrorListProvidedProps = {
  getDegradationNameById: (degradationId: DegradationId) => DegradationName,
};

type ErrorListOwnProps = {
  selectedDegradationRowIndex: Array<Index>,
  serviceId: ServiceId,
  errors: DegradationArray,
  onSelectError: OnSelectServiceError,
};

class ErrorListInner extends React.Component<
  ErrorListProvidedProps & ErrorListOwnProps,
  ErrorListState
> {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'degradation', title: 'Fehlerbild' },
        { name: 'count', title: 'Anzahl' },
        { name: 'timeStart', title: 'Startzeit' },
        { name: 'timeEnd', title: 'Endzeit' },
      ],
      columnExtensions: [
        { columnName: 'degradation', width: 200 },
        { columnName: 'count', width: 100 },
      ],
      rows: this.generateRows(this.props.errors),
      selectedRowIndex: this.props.selectedDegradationRowIndex,
      // pendingSelectionChange: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedRowIndex: nextProps.selectedDegradationRowIndex,
    });
  }

  getErrorById(id) {
    return this.state.rows.find(error => error.id === id);
  }

  generateRows(errors: Array<Degradation>): Array<ErrorListRow> {
    return errors.map((error, idx) => ({
      id: idx,
      degradation: this.props.getDegradationNameById(error.degradation),
      count: error.count,
      timeStart: error.timeStart,
      timeEnd: error.timeEnd,
      version: error.version,
    }));
  }

  changeSelection = newSelection => {
    const { serviceId, selectedDegradationRowIndex } = this.props;
    const selectRowIndex =
      newSelection[newSelection.length - 1] !== undefined
        ? newSelection[newSelection.length - 1]
        : -1;

    // this.setState({
    //   pendingSelectionChange: true,
    // });
    this.props.onSelectError(
      serviceId,
      this.state.rows[
        selectRowIndex !== -1 ? selectRowIndex : selectedDegradationRowIndex[0]
      ].degradation,
      selectRowIndex
    );
    // .then(success => {
    //   if (success) {
    //     this.setState({
    //       pendingSelectionChange: false,
    //     });
    //   }
    // });
  };

  render() {
    const { rows, columns, selectedRowIndex, columnExtensions } = this.state;
    return (
      <Grid rows={rows} columns={columns}>
        <RowDetailState />
        <SelectionState
          selection={[selectedRowIndex]}
          onSelectionChange={selectionArray =>
            this.changeSelection(selectionArray)
          }
        />
        <SortingState
          defaultSorting={[{ columnName: 'timeStart', direction: 'asc' }]}
        />
        <IntegratedSorting />

        <Table
          columnExtensions={columnExtensions}
          cellComponent={CellComponent}
        />
        <TableSelection
          cellComponent={({ tableRow, onToggle }) =>
            SelectionCell({
              selected: selectedRowIndex === tableRow.rowId,
              onToggle,
            })
          }
        />
        <TableHeaderRow showSortingControls />
        <TableRowDetail
          contentComponent={({ row }) => (
            <ErrorListRowDetail serviceId={this.props.serviceId} row={row} />
          )}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  getDegradationNameById: degradationId =>
    getDegradationNameById(state, degradationId),
});

export const ErrorList = connect(mapStateToProps, null)(ErrorListInner);
