// @flow
import React from 'react';
import { TableSelection } from '@devexpress/dx-react-grid-material-ui';
import { CircularProgress } from 'material-ui/Progress';

export const SelectionCell = ({
  pending,
  selected,
  onToggle,
}: {
  pending: boolean,
  selected: boolean,
  onToggle: () => void,
}) =>
  pending ? (
    <td
      className="MuiTableCell-root-214 MuiTableCell-body-216 MuiTableCell-paddingCheckbox-220 TableSelectCell-cell-263"
      style={{
        display: 'flex',
        alignItems: 'center',
        width: 125,
        display: 'table-cell',
      }}
    >
      <span className="MuiButtonBase-root-159 MuiIconButton-root-257 MuiSwitchBase-root-270 MuiSwitchBase-default-272 MuiCheckbox-default-265 TableSelectCell-checkbox-264">
        <CircularProgress size={20} />
      </span>
    </td>
  ) : (
    <TableSelection.Cell selected={selected} onToggle={onToggle} />
  );
