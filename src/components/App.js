import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { ApiErrors } from './ErrorHandling/ApiErrors';
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
        this.props.setFetchMacAddressError(e.message);
      });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <ApiErrors />
        {this.props.macAddress !== '' ? <ErrorsByUserService /> : null}
      </React.Fragment>
    );
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
  setFetchMacAddressError: error =>
    dispatch({ type: 'SET_ERROR_FETCH_MAC_ADDRESS', error }),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppInner);
