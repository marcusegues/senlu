import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
    } = this.props;
    return !!(
      errorFetchMacAddress ||
      errorFetchErrorsByService ||
      errorFetchServices
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
        onClose={this.handleClose}
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
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={this.props.classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  errorFetchMacAddress: getErrorFetchMacAddress(state),
  errorFetchServices: getErrorFetchServices(state),
  errorFetchErrorsByService: getErrorFetchErrorsByService(state),
});

export const ApiErrors = connect(mapStateToProps, null)(
  withStyles(styles)(ApiErrorsInner)
);
