// @flow
import React from 'react';
import { TableBody, TableCell, TableRow } from 'material-ui/Table';
import { SquareBox } from '../../../../Icons/SquareBox';
import { SquareBoxChecked } from '../../../../Icons/SquareBoxChecked';
import Checkbox from 'material-ui/Checkbox';

type CheckBoxState = 'notSelected' | 'selected' | 'pending';

type ErrorRowProps = {
  checkbox: CheckBoxState,
  onSelectError: () => Promise<>,
};

type ErrorRowState = {
  checkbox: CheckBoxState,
};

export class ErrorRow extends React.Component<ErrorRowProps, ErrorRowState> {
  constructor(props: ErrorRowProps) {
    super(props);
    this.state = {
      checkbox: props.checkbox,
    };
  }

  handleSelect(event) {
    this.setState({
      checkbox: 'pending',
    });
    const checked = event.target.checked;
    this.props.onSelectError().then(response => {
      debugger;
      this.setState({
        checkbox: checked ? 'selected' : 'notSelected',
      });
    });
  }

  render() {
    const { errorCode, count } = this.props;
    const { checkbox } = this.state;
    return (
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={checkbox}
              onChange={event => this.handleSelect(event)}
              color="primary"
            />
          </TableCell>
          <TableCell>{errorCode}</TableCell>
          <TableCell>{count}</TableCell>
        </TableRow>
      </TableBody>
    );
  }
}
