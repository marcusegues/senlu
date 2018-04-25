import React from 'react';
import Table, {
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from 'material-ui/Table';
import { ErrorRow } from './subcomponents/ErrorRow';
const uuidv4 = require('uuid/v4');

export const ErrorList = ({ errors, onSelectError, service }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Select Degradation</TableCell>
          <TableCell>Error Code</TableCell>
          <TableCell numeric>Count</TableCell>
          <TableCell>Time Start</TableCell>
          <TableCell>Time End</TableCell>
          <TableCell>Info</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {errors &&
          errors.map(error => (
            <ErrorRow
              key={uuidv4()}
              degradation={error.degradation}
              count={error.count}
              timeStart={error.timeStart}
              timeEnd={error.timeEnd}
              version={error.version}
              onSelectError={() => onSelectError(service, error.degradation)}
            />
          ))}
      </TableBody>
    </Table>
  );
};
