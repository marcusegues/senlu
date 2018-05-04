import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import {
  getErrorFetchErrorsByService,
  getErrorFetchMacAddress,
  getErrorFetchServices,
} from '../../selectors';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  snackbar: {
    margin: theme.spacing.unit,
  },
  anchorOriginBottomLeft: {
    left: 24,
    bottom: 24,
    right: 'auto',
  },
});

class ApiErrorsInner extends React.Component {
  state = {
    open: true,
  };

  errorsPresent() {
    const {
      errorFetchMacAddress,
      errorFetchErrorsByService,
      errorFetchServices,
      errorMissingCustomerId,
      errorMissingSessionId,
      errorMissingAccessToken,
    } = this.props;
    return !!(
      errorFetchMacAddress ||
      errorFetchErrorsByService ||
      errorFetchServices ||
      errorMissingCustomerId ||
      errorMissingSessionId ||
      errorMissingAccessToken
    );
  }

  render() {
    if (!this.errorsPresent()) {
      return null;
    }
    const {
      errorFetchMacAddress,
      errorFetchErrorsByService,
      errorFetchServices,
      errorMissingCustomerId,
      errorMissingSessionId,
      errorMissingAccessToken,
    } = this.props;

    return (
      <Snackbar
        classes={{
          root: this.props.classes.snackBar,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        message={
          <div>
            {errorFetchMacAddress ? (
              <div>
                <span>{errorFetchMacAddress}</span>
              </div>
            ) : null}
            {errorFetchServices ? (
              <div>
                <span>{errorFetchServices}</span>
              </div>
            ) : null}
            {errorFetchErrorsByService ? (
              <div>
                <span>{errorFetchErrorsByService}</span>
              </div>
            ) : null}
            {errorMissingCustomerId ? (
              <div>
                <span>{errorMissingCustomerId}</span>
              </div>
            ) : null}
            {errorMissingSessionId ? (
              <div>
                <span>{errorMissingSessionId}</span>
              </div>
            ) : null}
            {errorMissingAccessToken ? (
              <div>
                <span>{errorMissingAccessToken}</span>
              </div>
            ) : null}
          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  errorFetchMacAddress: getErrorFetchMacAddress(state),
  errorFetchServices: getErrorFetchServices(state),
  errorFetchErrorsByService: getErrorFetchErrorsByService(state),
  errorMissingCustomerId: state.query.fetchErrors.errorMissingCustomerId,
  errorMissingSessionId: state.query.fetchErrors.errorMissingSessionId,
  errorMissingAccessToken: state.query.fetchErrors.errorMissingAccessToken,
});

export const ApiErrors = connect(mapStateToProps, null)(
  withStyles(styles)(ApiErrorsInner)
);
