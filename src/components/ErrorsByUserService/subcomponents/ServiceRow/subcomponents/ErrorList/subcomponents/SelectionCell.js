// @flow
import React from 'react';
import { TableSelection } from '@devexpress/dx-react-grid-material-ui';

export const SelectionCell = ({
  selected,
  onToggle,
}: {
  selected: boolean,
  onToggle: () => void,
}) => <TableSelection.Cell selected={selected} onToggle={onToggle} />;
