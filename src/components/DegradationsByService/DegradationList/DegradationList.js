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
import '../../../styles/index.css';
import { CellComponent } from '../CellComponent';
import { SelectionCell } from '../SelectionCell';
import { getDegradationNameById } from '../../../selectors';
import { ErrorListRowDetail } from '../ErrorListRowDetail';
import type {
  Count,
  DegradationArray,
  DegradationName,
  TimeString,
  Version,
} from '../../../types/reducers/query';
import type {
  DegradationId,
  Index,
  SelectedRowIndex,
  ServiceId,
} from '../../../types/reducers';
import type { OnSelectServiceDegradation } from '../DegradationsByService';

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

type DegradationListState = {
  columns: Array<Column>,
  rows: Array<ErrorListRow>,
  columnExtensions: Array<ColumnExtension>,
  selectedRowIndex: SelectedRowIndex,
  pendingSelectionChange: Index,
};

type DegradationListProvidedProps = {
  getDegradationNameById: (degradationId: DegradationId) => DegradationName,
};

type DegradationListOwnProps = {
  selectedDegradationRowIndex: Index,
  serviceId: ServiceId,
  degradations: DegradationArray,
  onSelectDegradation: OnSelectServiceDegradation,
};

class DegradationListInner extends React.Component<
  DegradationListProvidedProps & DegradationListOwnProps,
  DegradationListState
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
      rows: this.generateRows(this.props.degradations),
      selectedRowIndex: this.props.selectedDegradationRowIndex,
      pendingSelectionChange: -1,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedRowIndex: nextProps.selectedDegradationRowIndex,
      rows: this.generateRows(nextProps.degradations),
    });
  }

  getErrorById(id) {
    return this.state.rows.find(degradation => degradation.id === id);
  }

  generateRows(degradations: DegradationArray): Array<ErrorListRow> {
    return degradations.map((degradation, idx) => ({
      id: idx,
      degradation: this.props.getDegradationNameById(degradation.degradation),
      count: degradation.count,
      timeStart: degradation.timeStart,
      timeEnd: degradation.timeEnd,
      version: degradation.version,
      uptime: degradation.uptime,
      logs: degradation.logs,
      proportions: degradation.proportions,
    }));
  }

  changeSelection = newSelection => {
    const { serviceId, selectedDegradationRowIndex, degradations } = this.props;
    let selectedRowIndex;
    let selected;
    if (newSelection.length) {
      // something was selected
      selectedRowIndex = newSelection[newSelection.length - 1];
      selected = true;
    } else {
      // something was unselected
      selectedRowIndex = selectedDegradationRowIndex;
      selected = false;
    }
    const degradationId = degradations[selectedRowIndex].degradation;

    this.setState({
      pendingSelectionChange: selectedRowIndex,
    });
    this.props
      .onSelectDegradation(serviceId, degradationId, selectedRowIndex, selected)
      .then(() => {
        this.setState({
          pendingSelectionChange: -1,
        });
      });
  };

  render() {
    const {
      rows,
      columns,
      selectedRowIndex,
      columnExtensions,
      pendingSelectionChange,
    } = this.state;

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
              pending: pendingSelectionChange === tableRow.rowId,
              selected: selectedRowIndex === tableRow.rowId,
              onToggle,
            })
          }
        />
        <TableHeaderRow showSortingControls />
        <TableRowDetail
          contentComponent={({ row }) => (
            <ErrorListRowDetail
              serviceId={this.props.serviceId}
              version={row.version}
              uptime={row.uptime}
              logs={row.logs}
              proportions={row.proportions}
            />
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

export const DegradationList = connect(mapStateToProps, null)(
  DegradationListInner
);
