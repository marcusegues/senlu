import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles/index';

export const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
