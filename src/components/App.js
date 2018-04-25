import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { ErrorsByUserService } from './ErrorsByUserService/ErrorsByUserService';
import { ErrorList } from './ErrorsByUserService/subcomponents/ServiceRow/subcomponents/ErrorList/ErrorList';
import Test from './test';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <NavBar />
    <ErrorsByUserService />
  </React.Fragment>
);
