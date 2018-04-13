// @flow
import React from 'react';
import List, { ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import * as hermioneApi from '../../api/hermione';
import * as harryApi from '../../api/harry';
import * as dumbledoreApi from '../../api/dumbledore';
import { ServiceRow } from './subcomponents/ServiceRow/ServiceRow';
import { DateTimeInput } from '../Input/DateTimeInput';
import { TextInput } from '../Input/TextInput';

type ErrorListCardState = {
  data: any,
  customerId: number,
  timespanStart: { date: string, time: string },
  timespanEnd: { date: string, time: string },
  fetchingHermione: boolean,
};

// hardcoded defaults
const CUSTOMER_ID = 100360253;
const SESSION_ID = 1130344;
const TIME_PERIOD_START = { date: '2018-02-27', time: '00:00' };
const TIME_PERIOD_END = { date: '2018-02-27', time: '22:00' };




export class ErrorListCard extends React.Component<{}, ErrorListCardState> {
  state = {
    data: {},
    customerId: CUSTOMER_ID,
    timespanStart: TIME_PERIOD_START,
    timespanEnd: TIME_PERIOD_END,
    fetchingHermione: false,
  };

  componentDidMount() {
    this.fetchHermioneDegradations();
    // harryApi.getDeviceDegradations().then(data => console.log('harry', data));
  }

  fetchHermioneDegradations() {
    const { timespanStart, timespanEnd } = this.state;
    this.setState({ fetchingHermione: true });
    return hermioneApi
      .getDegradationsByCustomerId(
        CUSTOMER_ID,
        `${timespanStart.date} ${timespanStart.time}:00`, // Hermione requires the two 00 at the end
        `${timespanEnd.date} ${timespanEnd.time}:00`
      )
      .then(data => {
        console.log('Hermione', data);
        this.setState({ data, fetchingHermione: false });
      });
  }

  handleSelectError(userService, errorCode) {
    const { timespanStart, timespanEnd } = this.state;
    return dumbledoreApi.selectCustomerDegradation(
      CUSTOMER_ID,
      SESSION_ID,
      `${timespanStart.date} ${timespanStart.time}, ${timespanEnd.date} ${
        timespanEnd.time
      }`,
      userService,
      errorCode
    );
  }

  handleChangeTimespan = name => event => {
    const [date, time] = event.target.value.split('T');
    this.setState(
      {
        [name]: { date, time },
      },
      () => this.fetchHermioneDegradations()
    );
  };

  handleChangeCustomerId = event => {
    this.setState(
      {
        customerId: event.target.value,
      },
      () => this.fetchHermioneDegradations()
    );
  };

  render() {
    const {
      data,
      timespanStart,
      timespanEnd,
      customerId,
      fetchingHermione,
    } = this.state;
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
          onChange={this.handleChangeTimespan('timespanStart')}
        />
        <DateTimeInput
          value={`${timespanEnd.date}T${timespanEnd.time}`}
          onChange={this.handleChangeTimespan('timespanEnd')}
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
