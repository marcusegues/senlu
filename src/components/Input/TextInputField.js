import React from 'react';
import TextField from 'material-ui/TextField';

export const TextInputField = ({ label, value, onChange, type = 'text' }) => (
    <form noValidate style={{ margin: 10, marginRight: 40 }}>
      <TextField type={type} label={label} value={value} onChange={onChange} />
    </form>
  );
