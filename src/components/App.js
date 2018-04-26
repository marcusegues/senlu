import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { ErrorsByUserService } from './ErrorsByUserService/ErrorsByUserService';

import { getQueryStringValue } from '../utils';
import { getMacAddressByCustomerId } from '../api/dumbledore';
import { getMacAddress } from '../selectors';

class AppInner extends React.Component {
  componentDidMount() {
    const customerId = getQueryStringValue('customerid');
    getMacAddressByCustomerId(customerId).then(data => {
      this.props.setMacAddress(data.deviceAddress);
    });
  }

  render() {
    return this.props.macAddress !== '' ? (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <ErrorsByUserService />
      </React.Fragment>
    ) : null;
  }
}

const mapStateToProps = state => ({
  macAddress: getMacAddress(state),
});

const mapDispatchToProps = dispatch => ({
  setMacAddress: macAddress =>
    dispatch({ type: 'SET_MAC_ADDRESS', macAddress }),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppInner);
