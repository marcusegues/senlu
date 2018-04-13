import React from 'react';
import TextField from 'material-ui/TextField';

export const DateTimeInput = ({ value, onChange }) => {
  return (
    <form noValidate style={{ margin: 10, alignSelf: 'flex-start' }}>
      <TextField
        id="datetime-local"
        label="Timespan Start"
        type="datetime-local"
        value={value}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChange}
      />
    </form>
  );
};
