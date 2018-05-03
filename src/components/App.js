import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { ApiErrors } from './ErrorHandling/ApiErrors';
import { ErrorsByUserService } from './ErrorsByUserService/ErrorsByUserService';
import { StatusInfo } from './StatusInfo/StatusInfo';
import { getQueryStringValue } from '../utils';
import { getMacAddress, getSessionId } from '../selectors';

class AppInner extends React.Component {
  componentDidMount() {
    const customerId = getQueryStringValue('customer_id');
    const sessionId = getQueryStringValue('session_id');
    this.props.setCustomerId(customerId);
    this.props.setSessionId(sessionId);
  }

  allParamsPresent() {
    return this.props.macAddress !== '' && this.props.sessionId !== '';
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <StatusInfo />
        <ApiErrors />
        {this.allParamsPresent() ? <ErrorsByUserService /> : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  macAddress: getMacAddress(state),
  sessionId: getSessionId(state),
});

const mapDispatchToProps = dispatch => ({
  setCustomerId: customerId =>
    dispatch({ type: 'SET_CUSTOMER_ID', customerId }),
  setSessionId: sessionId => dispatch({ type: 'SET_SESSION_ID', sessionId }),
  setMacAddress: macAddress =>
    dispatch({ type: 'SET_MAC_ADDRESS', macAddress }),
  setFetchMacAddressError: error =>
    dispatch({ type: 'SET_ERROR_FETCH_MAC_ADDRESS', error }),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppInner);
