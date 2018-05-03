import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';

export const CellComponent = ({ tableRow, tableColumn }) => {
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
