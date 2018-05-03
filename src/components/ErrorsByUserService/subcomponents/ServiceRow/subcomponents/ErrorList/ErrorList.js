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
import {
  getSessionId,
  getTimeSpanEnd,
  getTimeSpanStart,
} from '../../../../../../selectors';
import { getMacAddress } from '../../../../../../selectors/query/parameters';
import { ErrorListRowDetail } from './subcomponents/ErrorListRowDetail';

const generateRows = errors =>
  errors.map((error, idx) => ({
    id: idx, // this should be a unique error id coming from error.id in the future
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
      selection: [],
      pendingSelectionChange: {},
    };
  }

  getErrorById(id) {
    return this.state.rows.find(error => error.id === id);
  }

  changeSelection = newSelection => {
    const { selection } = this.state;
    const { service } = this.props;
    let selectionId;
    let selectionDirection;
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
    this.props
      .onSelectError(
        service,
        this.state.rows[selectionId].degradation,
        selectionDirection === 'select'
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
        <TableSelection />
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
