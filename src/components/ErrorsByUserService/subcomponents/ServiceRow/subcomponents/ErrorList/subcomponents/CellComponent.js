// @flow
import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';

type CellComponentOwnProps = {
  tableRow: Table.TableRow,
  tableColumn: Table.TableColumn,
};

export const CellComponent = ({
  tableRow,
  tableColumn,
}: CellComponentOwnProps) => {
  if (
    tableColumn.column.name === 'timeStart' ||
    tableColumn.column.name === 'timeEnd'
  ) {
    const timeString: string = tableRow.row[tableColumn.column.name];
    return (
      <Table.Cell>
        <div>{timeString.split(' ')[0]}</div>
        <div>{timeString.split(' ')[1]}</div>
      </Table.Cell>
    );
  }
  return <Table.Cell>{tableRow.row[tableColumn.column.name]}</Table.Cell>;
};
