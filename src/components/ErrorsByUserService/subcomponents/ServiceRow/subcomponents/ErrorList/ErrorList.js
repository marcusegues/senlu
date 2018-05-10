import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import { RowDetailState } from '@devexpress/dx-react-grid';
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
} from '@devexpress/dx-react-grid';
import '../../../../../../styles/index.css';
import { CellComponent } from './subcomponents/CellComponent';
import { SelectionCell } from './subcomponents/SelectionCell';
import {
  getSessionId,
  getTimeSpanEnd,
  getTimeSpanStart,
} from '../../../../../../selectors';
import { getMacAddress } from '../../../../../../selectors/query/parameters';
import { ErrorListRowDetail } from './subcomponents/ErrorListRowDetail';
const uuidv4 = require('uuid/v4');

const generateRows = errors =>
  errors.map(error => ({
    degradation: error.degradation,
    count: error.count,
    timeStart: error.timeStart,
    timeEnd: error.timeEnd,
    version: error.version,
  }));

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
      rows: generateRows(this.props.errors),
      selection: this.props.selectedDegradation,
      pendingSelectionChange: false,
    };
  }

  getErrorById(id) {
    return this.state.rows.find(error => error.id === id);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    this.setState({
      selection: nextProps.selectedDegradation,
    });
  }

  changeSelection = newSelection => {
    const { serviceId, selectedDegradation } = this.props;
    const selectRowId =
      newSelection[newSelection.length - 1] !== undefined
        ? newSelection[newSelection.length - 1]
        : null;

    this.setState({
      pendingSelectionChange: true,
    });
    this.props
      .onSelectError(
        serviceId,
        this.state.rows[
          selectRowId !== null ? selectRowId : selectedDegradation
        ].degradation,
        selectRowId
      )
      .then(success => {
        if (success) {
          this.setState({
            pendingSelectionChange: false,
          });
        }
      });
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
        <TableSelection cellComponent={SelectionCell} />
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
});

export const ErrorList = connect(mapStateToProps, null)(ErrorListInner);
