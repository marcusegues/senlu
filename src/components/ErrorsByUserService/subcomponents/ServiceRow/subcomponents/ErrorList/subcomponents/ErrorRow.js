// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Checkbox from 'material-ui/Checkbox';
import type { DumbledoreApi } from '../../../../../../../api/dumbledore';
import type { ErrorCode } from '../../../../../../../types/reducers/query/index';
import type {
  Count,
  Degradation,
  TimeString,
} from '../../../../../../../types/reducers/query';
import { Version } from '../../../../../../../types/reducers/query';

const styles = theme => ({
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
  degradation: Degradation,
  count: Count,
  timeStart: TimeString,
  timeEnd: TimeString,
  version: Version,
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
    const {
      degradation,
      count,
      timeStart,
      timeEnd,
      version,
      classes,
    } = this.props;
    const { checkbox } = this.state;
    return (
      <TableRow>
        <TableCell>{degradation}</TableCell>
        <TableCell>{count}</TableCell>
        <TableCell>{timeStart}</TableCell>
        <TableCell>{timeEnd}</TableCell>
        <TableCell>{version}</TableCell>
      </TableRow>
    );
  }
}

export const ErrorRow = withStyles(styles)(ErrorRowInner);
