import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { MockedErrorListCard } from './mockedUI/MockedErrorListCard';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <NavBar />
    <MockedErrorListCard />
  </React.Fragment>
);
