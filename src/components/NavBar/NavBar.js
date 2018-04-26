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
  constructor(props) {
    super(props);
    this.state = {
      timeSpanStart: this.props.timeSpanStart,
      timeSpanEnd: this.props.timeSpanEnd,
    };
  }

  handleChangeTimeSpanStart = event => {
    const [date, time] = event.target.value.split('T');
    this.setState({ timeSpanStart: { date, time } });
  };

  handleChangeTimeSpanEnd = event => {
    const [date, time] = event.target.value.split('T');
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
            label="Timespan start"
            type="datetime-local"
            value={`${timeSpanStart.date}T${timeSpanStart.time}`}
            onChange={event => this.handleChangeTimeSpanStart(event)}
          />
          <TextInputField
            label="Timespan end"
            type="datetime-local"
            value={`${timeSpanEnd.date}T${timeSpanEnd.time}`}
            onChange={event => this.handleChangeTimeSpanEnd(event)}
          />
          <Button color="primary" onClick={() => this.handleUpdate()}>
            Update
          </Button>
        </div>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  timeSpanStart: getTimeSpanStart(state),
  timeSpanEnd: getTimeSpanEnd(state),
  fetchingErrorsByService: getFetchingErrorsByService(state),
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
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NavBarInner)
);
