// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Checkbox from 'material-ui/Checkbox';
import type { DumbledoreApi } from '../../../../../../../api/dumbledore';
import type { ErrorCode } from '../../../../../../../types/reducers/query/index';

const styles = theme => ({
  checkboxRoot: { height: 30, width: 30 },
  row: {
    height: 40,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

type CheckBoxState = 'notSelected' | 'selected' | 'pending';

type ErrorRowProps = {
  checkbox: CheckBoxState,
  onSelectError: () => DumbledoreApi,
  errorCode: ErrorCode,
  count: number,
  timeStart: string,
  timeEnd: string,
  info: string,
  classes: Object,
};

type ErrorRowState = {
  checkbox: CheckBoxState,
};

class ErrorRowInner extends React.Component<ErrorRowProps, ErrorRowState> {
  constructor(props: ErrorRowProps) {
    super(props);
    this.state = {
      checkbox: props.checkbox || 'notSelected',
    };
  }

  handleSelect() {
    const checked = this.state.checkbox;
    this.setState({
      checkbox: 'pending',
    });
    if (checked === 'notSelected') {
      this.props.onSelectError().then(success => {
        if (success) {
          this.setState({
            checkbox: 'selected',
          });
        } else {
          this.setState({
            checkbox: 'notSelected',
          });
        }
      });
    } else if (checked === 'selected') {
      // simulate an API call to unselect the box
      setTimeout(() => {
        this.setState({
          checkbox: 'notSelected',
        });
      }, 500);
    }
  }

  render() {
    const { errorCode, count, timeStart, timeEnd, info, classes } = this.props;
    const { checkbox } = this.state;
    return (
      <TableRow
        classes={{
          root: classes.row,
        }}
      >
        <TableCell padding="checkbox">
          <div
            style={{
              display: 'flex',
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {checkbox === 'pending' ? (
              <CircularProgress size={20} />
            ) : (
              <Checkbox
                classes={{
                  root: classes.checkboxRoot,
                }}
                checked={checkbox === 'selected'}
                onChange={() => this.handleSelect()}
                color="primary"
              />
            )}
          </div>
        </TableCell>
        <TableCell>{errorCode}</TableCell>
        <TableCell>{count}</TableCell>
        <TableCell>{timeStart}</TableCell>
        <TableCell>{timeEnd}</TableCell>
        <TableCell>{info}</TableCell>
      </TableRow>
    );
  }
}

export const ErrorRow = withStyles(styles)(ErrorRowInner);
