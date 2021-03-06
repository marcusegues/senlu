// @flow
import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { TextInputField } from '../Input/TextInputField';
import { updateUIData } from '../../actions/ui';
import {
  getMacAddress,
  getTimeSpanEnd,
  getTimeSpanStart,
} from '../../selectors';
import type { MacAddress, TimeSpanDelimiter } from '../../types/reducers/query';
import { version } from '../../../package.json';

const styles: Object = {
  root: {
    color: 'primary',
    background: '#2096ba',
  },
  flex: {
    flex: 1,
  },
};

type NavBarProvidedProps = {
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
  macAddress: MacAddress,
  setTimeSpanStart: (timeSpanStart: TimeSpanDelimiter) => Promise<void>,
  setTimeSpanEnd: (timeSpanEnd: TimeSpanDelimiter) => Promise<void>,
  updateUIData: () => void,
  resetErrorFetchErrorsByService: () => void,
  classes: Object,
};

type NavBarState = {
  timeSpanStart: TimeSpanDelimiter,
  timeSpanEnd: TimeSpanDelimiter,
};

class NavBarInner extends React.Component<NavBarProvidedProps, NavBarState> {
  constructor(props) {
    super(props);
    this.state = {
      timeSpanStart: this.props.timeSpanStart,
      timeSpanEnd: this.props.timeSpanEnd,
    };
  }

  handleChangeTimeSpanStart = (event: Object): void => {
    const [date, time] = event.target.value.split('T');
    this.props.resetErrorFetchErrorsByService();
    this.setState({ timeSpanStart: { date, time } });
  };

  handleChangeTimeSpanEnd = (event: Object): void => {
    const [date, time] = event.target.value.split('T');
    this.props.resetErrorFetchErrorsByService();
    this.setState({ timeSpanEnd: { date, time } });
  };

  handleUpdate() {
    const { timeSpanStart, timeSpanEnd } = this.state;
    Promise.all([
      this.props.setTimeSpanStart({
        date: timeSpanStart.date,
        time: timeSpanStart.time,
      }),
      this.props.setTimeSpanEnd({
        date: timeSpanEnd.date,
        time: timeSpanEnd.time,
      }),
    ]).then(() => this.props.updateUIData());
  }

  render() {
    const { classes } = this.props;
    const { timeSpanStart, timeSpanEnd } = this.state;
    return (
      <AppBar
        position="sticky"
        color="secondary"
        classes={{
          root: classes.root,
        }}
      >
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Sentinel
          </Typography>
          <Typography color="inherit">Version {version}</Typography>
        </Toolbar>
        {this.props.macAddress !== '' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'white',
            }}
          >
            <TextInputField
              label="Startzeit"
              type="datetime-local"
              value={`${timeSpanStart.date}T${timeSpanStart.time}`}
              onChange={event => this.handleChangeTimeSpanStart(event)}
            />
            <TextInputField
              label="Endzeit"
              type="datetime-local"
              value={`${timeSpanEnd.date}T${timeSpanEnd.time}`}
              onChange={event => this.handleChangeTimeSpanEnd(event)}
            />
            <Button color="primary" onClick={() => this.handleUpdate()}>
              Aktualisieren
            </Button>
          </div>
        ) : null}
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  timeSpanStart: getTimeSpanStart(state),
  timeSpanEnd: getTimeSpanEnd(state),
  macAddress: getMacAddress(state),
});

const mapDispatchToProps = dispatch => ({
  setTimeSpanStart: timeSpanStart =>
    new Promise(resolve => {
      dispatch({ type: 'SET_TIMESPAN_START', timeSpanStart });
      resolve();
    }),
  setTimeSpanEnd: timeSpanEnd =>
    new Promise(resolve => {
      dispatch({ type: 'SET_TIMESPAN_END', timeSpanEnd });
      resolve();
    }),
  updateUIData: () => dispatch(updateUIData()),
  resetErrorFetchErrorsByService: () =>
    dispatch({ type: 'RESET_ERROR_FETCH_ERRORS_BY_SERVICE' }),
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NavBarInner)
);
