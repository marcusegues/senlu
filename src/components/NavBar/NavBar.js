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
  getCustomerId,
  getFetchingErrorsByService,
  getTimeSpanEnd,
  getTimeSpanStart,
} from '../../selectors';

const styles = {
  root: {
    color: 'primary',
    background: '#2096ba',
  },
};
class NavBarInner extends React.Component {
  state = {
    customerId: this.props.customerId,
  };

  handleChangeCustomerId = event => {
    this.setState({
      customerId: event.target.value,
    });
  };

  handleSetCustomerId() {
    this.props.setCustomerId(this.state.customerId);
    this.props.updateUIData();
  }

  handleChangeTimespanStart = event => {
    const [date, time] = event.target.value.split('T');
    this.props.setTimeSpanStart({ date, time });
    this.props.updateUIData();
  };

  handleChangeTimespanEnd = event => {
    const [date, time] = event.target.value.split('T');
    this.props.setTimeSpanEnd({ date, time });
    this.props.updateUIData();
  };

  render() {
    const { timeSpanStart, timeSpanEnd, classes } = this.props;
    return (
      <AppBar
        position="sticky"
        color="secondary"
        classes={{
          root: classes.root,
        }}
      >
        <Toolbar>
          <Typography variant="title" color="inherit">
            Sentinel
          </Typography>
        </Toolbar>
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
            style={{ marginRight: 0 }}
            label="MAC Address"
            value={this.state.customerId}
            onChange={event => this.handleChangeCustomerId(event)}
          />
          <Button color="primary" onClick={() => this.handleSetCustomerId()}>
            Update
          </Button>
          <TextInputField
            label="Timespan start"
            type="datetime-local"
            value={`${timeSpanStart.date}T${timeSpanStart.time}`}
            onChange={event => this.handleChangeTimespanStart(event)}
          />
          <TextInputField
            label="Timespan end"
            type="datetime-local"
            value={`${timeSpanEnd.date}T${timeSpanEnd.time}`}
            onChange={event => this.handleChangeTimespanEnd(event)}
          />
        </div>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  customerId: getCustomerId(state),
  timeSpanStart: getTimeSpanStart(state),
  timeSpanEnd: getTimeSpanEnd(state),
  fetchingErrorsByService: getFetchingErrorsByService(state),
});

const mapDispatchToProps = dispatch => ({
  setCustomerId: customerId =>
    dispatch({ type: 'SET_CUSTOMER_ID', customerId }),
  setTimeSpanStart: timeSpanStart =>
    dispatch({ type: 'SET_TIMESPAN_START', timeSpanStart }),
  setTimeSpanEnd: timeSpanEnd =>
    dispatch({ type: 'SET_TIMESPAN_END', timeSpanEnd }),
  updateUIData: () => dispatch(updateUIData()),
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NavBarInner)
);
