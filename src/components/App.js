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
    const customerId = getQueryStringValue('customer_id');
    this.props.setCustomerId(customerId);
    getMacAddressByCustomerId(customerId)
      .then(data => {
        this.props.setMacAddress(data.deviceAddress);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
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
  setCustomerId: customerId =>
    dispatch({ type: 'SET_CUSTOMER_ID', customerId }),
  setMacAddress: macAddress =>
    dispatch({ type: 'SET_MAC_ADDRESS', macAddress }),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppInner);
