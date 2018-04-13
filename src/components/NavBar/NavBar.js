import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { TextInputField } from '../Input/TextInputField';
import { fetchHermioneDegradations } from '../../actions/hermione';

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
    this.props.getHermioneDegradations();
  }

  handleChangeTimespanStart = event => {
    const [date, time] = event.target.value.split('T');
    this.props.setTimespanStart({ date, time });
    this.props.getHermioneDegradations();
  };

  handleChangeTimespanEnd = event => {
    const [date, time] = event.target.value.split('T');
    this.props.setTimespanEnd({ date, time });
    this.props.getHermioneDegradations();
  };

  render() {
    const { customerId, timespanStart, timespanEnd, classes } = this.props;
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
            label={'Customer Id'}
            value={this.state.customerId}
            onChange={event => this.handleChangeCustomerId(event)}
          />
          <Button color="primary" onClick={() => this.handleSetCustomerId()}>
            Ok
          </Button>
          <TextInputField
            label={'Timespan start'}
            type={'datetime-local'}
            value={`${timespanStart.date}T${timespanStart.time}`}
            onChange={event => this.handleChangeTimespanStart(event)}
          />
          <TextInputField
            label={'Timespan end'}
            type={'datetime-local'}
            value={`${timespanEnd.date}T${timespanEnd.time}`}
            onChange={event => this.handleChangeTimespanEnd(event)}
          />
        </div>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  customerId: state.api.customerId,
  timespanStart: state.api.timespanStart,
  timespanEnd: state.api.timespanEnd,
  fetchingHermione: state.api.fetchingHermione,
});

const mapDispatchToProps = dispatch => ({
  setCustomerId: customerId =>
    dispatch({ type: 'SET_CUSTOMER_ID', customerId }),
  setTimespanStart: timespanStart =>
    dispatch({ type: 'SET_TIMESPAN_START', timespanStart }),
  setTimespanEnd: timespanEnd =>
    dispatch({ type: 'SET_TIMESPAN_END', timespanEnd }),
  getHermioneDegradations: () => dispatch(fetchHermioneDegradations()),
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NavBarInner)
);
