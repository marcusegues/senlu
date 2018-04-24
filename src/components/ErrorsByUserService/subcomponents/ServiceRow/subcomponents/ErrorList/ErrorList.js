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
          errors.map(([errorCode, count, timeStart, timeEnd, info]) => (
            <ErrorRow
              key={uuidv4()}
              errorCode={errorCode}
              count={count}
              timeStart={timeStart}
              timeEnd={timeEnd}
              info={info}
              onSelectError={() => onSelectError(service, errorCode)}
            />
          ))}
      </TableBody>
    </Table>
  );
};
