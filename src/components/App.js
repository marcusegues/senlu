import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { ApiErrors } from './ErrorHandling/ApiErrors';
import { ErrorsByUserService } from './ErrorsByUserService/ErrorsByUserService';
import { StatusInfo } from './StatusInfo/StatusInfo';
import { getQueryStringValue } from '../utils';
import { getMacAddress, getSessionId } from '../selectors';
import { getMacAddressByCustomerId } from '../api/dumbledore';
import { fetchStatusInfo } from '../actions/statusInfo';

class AppInner extends React.Component {
  componentDidMount() {
    this.checkQueryParams()
      .then(({ customerId }) => {
        getMacAddressByCustomerId(customerId)
          .then(data => {
            this.props.setMacAddress(data.device_address);
            this.props.getStatusInfo();
          })
          .catch(e => {
            this.props.setFetchMacAddressError(e.message);
          });
      })
      .catch(e => {
        console.log('Missing query params.');
      });
  }

  checkQueryParams() {
    return new Promise((resolve, reject) => {
      const customerId = getQueryStringValue('customer_id');
      const sessionId = getQueryStringValue('session_id');
      const accessToken = getQueryStringValue('access_token');
      this.props.setCustomerId(customerId);
      this.props.setSessionId(sessionId);
      this.props.setAccessToken(accessToken);
      if (customerId === '' || sessionId === '' || accessToken === '') {
        if (customerId === '') {
          this.props.setErrorMissingCustomerId('Missing customerId.');
        }
        if (sessionId === '') {
          this.props.setErrorMissingSessionId('Missing sessionId.');
        }
        if (accessToken === '') {
          this.props.setErrorMissingAccessToken('Missing accessToken.');
        }
        reject(new Error('Missing query params.'));
      } else {
        resolve({ customerId, sessionId, accessToken });
      }
    });
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
  setAccessToken: accessToken =>
    dispatch({ type: 'SET_ACCESS_TOKEN', accessToken }),
  setMacAddress: macAddress =>
    dispatch({ type: 'SET_MAC_ADDRESS', macAddress }),
  setFetchMacAddressError: error =>
    dispatch({ type: 'SET_ERROR_FETCH_MAC_ADDRESS', error }),
  setErrorMissingCustomerId: error =>
    dispatch({ type: 'SET_ERROR_MISSING_CUSTOMER_ID', error }),
  setErrorMissingSessionId: error =>
    dispatch({ type: 'SET_ERROR_MISSING_SESSION_ID', error }),
  setErrorMissingAccessToken: error =>
    dispatch({ type: 'SET_ERROR_MISSING_ACCESS_TOKEN', error }),
  getStatusInfo: () => dispatch(fetchStatusInfo()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppInner);
