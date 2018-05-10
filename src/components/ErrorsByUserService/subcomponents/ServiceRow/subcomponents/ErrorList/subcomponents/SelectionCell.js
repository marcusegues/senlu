import React from 'react';
import { TableSelection } from '@devexpress/dx-react-grid-material-ui';
import Radio from 'material-ui/Radio';

export const SelectionCell = ({
  tableRow,
  tableColumn,
  selected,
  onToggle,
}) => <TableSelection.Cell selected={selected} onToggle={onToggle} />;
