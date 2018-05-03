import React from 'react';
import Paper from 'material-ui/Paper';

export const PaperCard = ({ children, style }) => (
  <Paper
    style={{
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 15,
      ...style,
    }}
  >
    {' '}
    {children}{' '}
  </Paper>
);
