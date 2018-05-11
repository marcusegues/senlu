import React from 'react';
import { TableSelection } from '@devexpress/dx-react-grid-material-ui';

export const SelectionCell = ({ selected, onToggle }) => {
  debugger;
  return <TableSelection.Cell selected={selected} onToggle={onToggle} />;
};
