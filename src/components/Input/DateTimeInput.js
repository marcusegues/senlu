// @flow
import React from 'react';
import TextField from 'material-ui/TextField';

type DateTimeInputProps = {
  value: string,
  label: string,
  onChange: () => void,
};

export const DateTimeInput = ({
  value,
  label,
  onChange,
}: DateTimeInputProps) => (
  <form noValidate style={{ margin: 10 }}>
    <TextField
      label={label}
      value={value}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={onChange}
      type="datetime-local"
    />
  </form>
);
