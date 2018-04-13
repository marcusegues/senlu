// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import * as dumbledoreApi from '../../api/dumbledore';
import { ServiceRow } from './subcomponents/ServiceRow/ServiceRow';
import { DateTimeInput } from '../Input/DateTimeInput';
import { TextInputField } from '../Input/TextInputField';
import { fetchHermioneDegradations } from '../../actions/hermione';

type ErrorListCardProps = {
  setCustomerId: () => void,
  setTimespanStart: () => void,
  setTimespanEnd: () => void,
  getHermioneDegradations: () => void,
  data: any,
  fetchingHermione: boolean,
  timespanStart: any,
  timespanEnd: any,
  customerId: number,
  sessionId: number,
};

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

const CardHeader = () => {
  return <div style={{ width: '100%' }}> Hello</div>;
};

class ErrorListCard extends React.Component<ErrorListCardProps, {}> {
  componentDidMount() {
    this.props.getHermioneDegradations();
  }

  handleSelectError(userService, errorCode) {
    const { timespanStart, timespanEnd, customerId, sessionId } = this.props;
    return dumbledoreApi.selectCustomerDegradation(
      customerId,
      sessionId,
      `${timespanStart.date} ${timespanStart.time}`,
      `${timespanEnd.date} ${timespanEnd.time}`,
      userService,
      errorCode
    );
  }

  render() {
    const { data, fetchingHermione, classes } = this.props;
    return (
      <Paper
        style={{
          width: 400,
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 15,
        }}
      >
        <List
          classes={{
            root: classes.root,
          }}
          subheader={
            <ListSubheader component="div">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Frontend Errors
                {fetchingHermione ? (
                  <CircularProgress style={{ margin: 10 }} />
                ) : null}
              </div>
            </ListSubheader>
          }
        >
          {Object.keys(data).map(service => (
            <ServiceRow
              key={service}
              service={service}
              errors={data[service]}
              onSelectError={(userService, errorCode) =>
                this.handleSelectError(userService, errorCode)
              }
            />
          ))}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  customerId: state.api.customerId,
  sessionId: state.api.sessionId,
  timespanStart: state.api.timespanStart,
  timespanEnd: state.api.timespanEnd,
  fetchingHermione: state.api.fetchingHermione,
  data: state.api.data,
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

export const HermioneErrorListCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ErrorListCard));
