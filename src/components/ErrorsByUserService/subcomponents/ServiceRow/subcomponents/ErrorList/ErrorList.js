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
import {
  getDegradationNameById,
  getSessionId,
  getTimeSpanEnd,
  getTimeSpanStart,
} from '../../../../../../selectors';
import { getMacAddress } from '../../../../../../selectors/query/parameters';
import { ErrorListRowDetail } from './subcomponents/ErrorListRowDetail';

class ErrorListInner extends React.Component {
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
      selection: this.props.selectedDegradation,
      // pendingSelectionChange: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selection: nextProps.selectedDegradation,
    });
  }

  getErrorById(id) {
    return this.state.rows.find(error => error.id === id);
  }

  generateRows(errors) {
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
    const { serviceId, selectedDegradation } = this.props;
    const selectRowId =
      newSelection[newSelection.length - 1] !== undefined
        ? newSelection[newSelection.length - 1]
        : null;

    // this.setState({
    //   pendingSelectionChange: true,
    // });
    this.props.onSelectError(
      serviceId,
      this.state.rows[selectRowId !== null ? selectRowId : selectedDegradation]
        .degradation,
      selectRowId
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
    const { rows, columns, selection, columnExtensions } = this.state;
    return (
      <Grid rows={rows} columns={columns}>
        <RowDetailState />
        <SelectionState
          selection={selection}
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
              selected: selection.indexOf(tableRow.rowId) !== -1,
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
  macAddress: getMacAddress(state),
  sessionId: getSessionId(state),
  timeSpanStart: getTimeSpanStart(state),
  timeSpanEnd: getTimeSpanEnd(state),
  getDegradationNameById: degradationId =>
    getDegradationNameById(state, degradationId),
});

export const ErrorList = connect(mapStateToProps, null)(ErrorListInner);
