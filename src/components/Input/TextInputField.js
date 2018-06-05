// @flow
import React from 'react';
import TextField from 'material-ui/TextField';

type TextInputFieldProps = {
  label: string,
  value: string,
  onChange: (event: Object) => void,
  type?: string,
  style?: Object,
};

export const TextInputField = ({
  label,
  value,
  onChange,
  type,
  style,
}: TextInputFieldProps) => (
  <div style={{ margin: 10, marginRight: 40, ...style }}>
    <TextField type={type} label={label} value={value} onChange={onChange} />
  </div>
);

TextInputField.defaultProps = {
  type: 'text',
  style: {},
};
