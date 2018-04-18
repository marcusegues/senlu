import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { HermioneErrorListCard } from './ErrorList/HermioneErrorListCard';
import { TrafficLightGreen } from '../icons/svg/trafficLightGreen';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <NavBar />
    <HermioneErrorListCard />
  </React.Fragment>
);
