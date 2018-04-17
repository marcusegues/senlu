import React from 'react';
import TextField from 'material-ui/TextField';

export const DateTimeInput = ({ value, label, onChange }) => (
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
