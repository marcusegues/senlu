// @flow
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const Root = () => (
  <MuiThemeProvider>
    <div>
      Hello, world!<RaisedButton label="default" />
    </div>
  </MuiThemeProvider>
);

export default Root;
