// @flow
import React from 'react';
import { TableBody, TableCell, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Checkbox from 'material-ui/Checkbox';
import type {DumbledoreApi} from "../../../../../api/dumbledore";

type CheckBoxState = 'notSelected' | 'selected' | 'pending';

type ErrorRowProps = {
  checkbox: CheckBoxState,
  onSelectError: () => DumbledoreApi,
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

  handleSelect() {
    this.setState({
      checkbox: 'pending',
    });
    this.props.onSelectError().then(response => {
      if (response.status === 200) {
        this.setState({
          checkbox: 'selected',
        });
      } else {
        this.setState({
          checkbox: 'notSelected',
        });
      }
    });
  }

  render() {
    const { errorCode, count } = this.props;
    const { checkbox } = this.state;
    return (
      <TableBody>
        <TableRow>
          <TableCell>
            {checkbox === 'pending' ? (
              <CircularProgress />
            ) : (
              <Checkbox
                checked={checkbox === 'selected'}
                onChange={() => this.handleSelect()}
                color="primary"
              />
            )}
          </TableCell>
          <TableCell>{errorCode}</TableCell>
          <TableCell>{count}</TableCell>
        </TableRow>
      </TableBody>
    );
  }
}
