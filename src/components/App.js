import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { HermioneErrorListCard } from './ErrorList/HermioneErrorListCard';
import { NavBar } from './NavBar/NavBar';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <NavBar />
    <HermioneErrorListCard />
  </React.Fragment>
);
