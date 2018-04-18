import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { MockedErrorListCard } from './mockedUI/MockedErrorListCard';
import { HermioneErrorListCard } from './ErrorList/HermioneErrorListCard';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <NavBar />
    <HermioneErrorListCard />
  </React.Fragment>
);
