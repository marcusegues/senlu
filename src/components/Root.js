// @flow
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { ErrorCardList } from './ErrorCardList';

const Root = () => (
  <MuiThemeProvider>
    <ErrorCardList />
  </MuiThemeProvider>
);

export default Root;
