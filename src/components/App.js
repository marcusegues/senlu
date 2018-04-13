import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { ErrorListCard } from './ErrorList/HermioneErrorListCard';
import NavBar from './NavBar/NavBar';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <NavBar />
    <ErrorListCard />
  </React.Fragment>
);
