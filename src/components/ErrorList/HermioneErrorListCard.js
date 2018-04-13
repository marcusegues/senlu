// @flow
import React from 'react';
import { connect } from 'react-redux';
import List, { ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import * as dumbledoreApi from '../../api/dumbledore';
import { ServiceRow } from './subcomponents/ServiceRow/ServiceRow';
import { DateTimeInput } from '../Input/DateTimeInput';
import { TextInput } from '../Input/TextInput';
import { fetchHermioneDegradations } from '../../actions/hermione';

type ErrorListCardProps = {
  setCustomerId: () => void,
  setTimespanStart: () => void,
  setTimespanEnd: () => void,
  timespanStart: any,
  timespanEnd: any,
  customerId: number,
  sessionId: number,
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
      `${timespanStart.date} ${timespanStart.time}, ${timespanEnd.date} ${
        timespanEnd.time
      }`,
      userService,
      errorCode
    );
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

  handleChangeCustomerId = event => {
    this.props.setCustomerId(event.target.value);
  };

  render() {
    const {
      data,
      timespanStart,
      timespanEnd,
      customerId,
      fetchingHermione,
    } = this.props;
    return (
      <Paper
        style={{
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 15,
        }}
      >
        <TextInput
          label={'Customer Id'}
          value={customerId}
          onChange={this.handleChangeCustomerId}
        />
        <DateTimeInput
          value={`${timespanStart.date}T${timespanStart.time}`}
          onChange={event => this.handleChangeTimespanStart(event)}
        />
        <DateTimeInput
          value={`${timespanEnd.date}T${timespanEnd.time}`}
          onChange={event => this.handleChangeTimespanEnd(event)}
        />
        {fetchingHermione ? (
          <CircularProgress style={{ margin: 10 }} />
        ) : (
          <List
            subheader={
              <ListSubheader component="div">Nested List Items</ListSubheader>
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
        )}
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  customerId: state.api.customerId,
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
)(ErrorListCard);
