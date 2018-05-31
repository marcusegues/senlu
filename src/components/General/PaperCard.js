// @flow
import * as React from 'react';
import Paper from 'material-ui/Paper';

type PaperCardProps = {
  children: React.Node,
  style?: Object,
};

export const PaperCard = ({ children, style }: PaperCardProps) => (
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
    {children}
  </Paper>
);

PaperCard.defaultProps = {
  style: {},
};
