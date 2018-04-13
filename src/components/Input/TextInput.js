import React from 'react';
import TextField from 'material-ui/TextField';

export const TextInput = ({ label, value, onChange }) => {
  return (
    <form noValidate style={{ margin: 10, alignSelf: 'flex-start' }}>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        margin="normal"
      />
    </form>
  );
};
