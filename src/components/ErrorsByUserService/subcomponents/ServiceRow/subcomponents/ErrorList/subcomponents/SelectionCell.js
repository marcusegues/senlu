import React from 'react';
import { TableSelection } from '@devexpress/dx-react-grid-material-ui';

export const SelectionCell = ({ selected, onToggle }) => (
  <TableSelection.Cell selected={selected} onToggle={onToggle} />
);
