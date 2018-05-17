// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import { NavBar } from './NavBar/NavBar';
import { ApiErrors } from './ErrorHandling/ApiErrors';
import { DegradationsByService } from './DegradationsByService/DegradationsByService';
import { StatusInfo } from './StatusInfo/StatusInfo';
import { getQueryStringValue } from '../utils';
import { getMacAddress, getSessionId } from '../selectors';
import {
  fetchLatestSoftwareVersion,
  fetchStatusInfo,
  fetchTechnology,
} from '../actions/statusInfo';
import { fetchMacAddressByCustomerId } from '../actions/parameters';
import type {
  AccessToken,
  CustomerId,
  MacAddress,
  SessionId,
} from '../types/reducers/query';
import type { FetchError } from '../types/reducers/query/fetchErrors';
import type { Dispatch } from '../types';

type AppProvidedProps = {
  macAddress: MacAddress,
  sessionId: SessionId,
  setCustomerId: (customerId: CustomerId) => void,
  setSessionId: (sessionId: SessionId) => void,
  setAccessToken: (accessToken: AccessToken) => void,
  setErrorMissingCustomerId: (error: FetchError) => void,
  setErrorMissingSessionId: (error: FetchError) => void,
  setErrorMissingAccessToken: (error: FetchError) => void,
  getStatusInfo: () => void,
  getLatestSoftwareVersion: () => void,
  getTechnology: (customerId: CustomerId) => void,
  fetchMacAddressByCustomerId: (
    customerId: CustomerId
  ) => Promise<{ device_address: string }>,
};

class AppInner extends React.Component<AppProvidedProps, null> {
  componentDidMount() {
    this.checkQueryParams()
      .then(({ customerId }) => {
        this.props.fetchMacAddressByCustomerId(customerId).then(() => {
          this.props.getStatusInfo();
          this.props.getLatestSoftwareVersion();
          this.props.getTechnology(customerId);
        });
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e.message);
      });
  }

  checkQueryParams() {
    const { setCustomerId, setSessionId, setAccessToken } = this.props;
    return new Promise((resolve, reject) => {
      const customerId = getQueryStringValue('customer_id');
      const sessionId = getQueryStringValue('session_id');
      const accessToken = getQueryStringValue('access_token') || '123';
      setCustomerId(customerId);
      setSessionId(sessionId);
      setAccessToken(accessToken);
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
        {this.allParamsPresent() ? <DegradationsByService /> : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  macAddress: getMacAddress(state),
  sessionId: getSessionId(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCustomerId: customerId =>
    dispatch({ type: 'SET_CUSTOMER_ID', customerId }),
  setSessionId: sessionId => dispatch({ type: 'SET_SESSION_ID', sessionId }),
  setAccessToken: accessToken =>
    dispatch({ type: 'SET_ACCESS_TOKEN', accessToken }),
  setErrorMissingCustomerId: error =>
    dispatch({ type: 'SET_ERROR_MISSING_CUSTOMER_ID', error }),
  setErrorMissingSessionId: error =>
    dispatch({ type: 'SET_ERROR_MISSING_SESSION_ID', error }),
  setErrorMissingAccessToken: error =>
    dispatch({ type: 'SET_ERROR_MISSING_ACCESS_TOKEN', error }),
  getStatusInfo: () => dispatch(fetchStatusInfo()),
  getLatestSoftwareVersion: () => dispatch(fetchLatestSoftwareVersion()),
  getTechnology: customerId => dispatch(fetchTechnology(customerId)),
  fetchMacAddressByCustomerId: customerId =>
    dispatch(fetchMacAddressByCustomerId(customerId)),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppInner);
