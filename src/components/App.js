import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { ErrorsByUserService } from './ErrorsByUserService/ErrorsByUserService';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <NavBar />
    <ErrorsByUserService />
  </React.Fragment>
);
