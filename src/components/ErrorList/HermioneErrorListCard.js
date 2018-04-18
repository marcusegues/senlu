// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import * as dumbledoreApi from '../../api/dumbledore';
import { ServiceRow } from './subcomponents/ServiceRow/ServiceRow';
import { fetchHermioneDegradations } from '../../actions/hermione';
import { fetchDumbledoreUserServices } from '../../actions/dumbledore';

type ErrorListCardProps = {
  getHermioneDegradations: () => void,
  getDumbledoreUserServices: () => void,
  hermioneErrorsByService: Object,
  dumbledoreUserServices: Array<any>,
  fetchingHermione: boolean,
  fetchingDumbledore: boolean,
  timespanStart: any,
  timespanEnd: any,
  customerId: number,
  sessionId: number,
  classes: Object,
};

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

class ErrorListCard extends React.Component<ErrorListCardProps, {}> {
  componentDidMount() {
    this.props.getHermioneDegradations();
    this.props.getDumbledoreUserServices();
  }

  formatData() {
    const data = {};
    this.props.dumbledoreUserServices.forEach(service => {
      data[service] = this.props.hermioneErrorsByService[service] || [];
    });
    return data;
  }

  handleSelectError(userService, errorCode) {
    const { timespanStart, timespanEnd, customerId, sessionId } = this.props;
    return dumbledoreApi
      .selectCustomerDegradation(
        customerId,
        sessionId,
        timespanStart,
        timespanEnd,
        userService,
        errorCode
      )
      .then(response => response && response.status === 200);
  }

  fetchingData() {
    return this.props.fetchingHermione || this.props.fetchingDumbledore;
  }

  render() {
    const { classes } = this.props;
    const data = this.formatData();
    const fetchingData = this.fetchingData();
    return (
      <Paper
        style={{
          width: 800,
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
                QoE Degradations
                {fetchingData ? (
                  <CircularProgress style={{ margin: 10 }} />
                ) : null}
              </div>
            </ListSubheader>
          }
        >
          {fetchingData
            ? null
            : Object.keys(data).map(service => (
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
  fetchingDumbledore: state.api.fetchingDumbledore,
  hermioneErrorsByService: state.api.hermioneErrorsByService,
  dumbledoreUserServices: state.api.dumbledoreUserServices,
});

const mapDispatchToProps = dispatch => ({
  getHermioneDegradations: () => dispatch(fetchHermioneDegradations()),
  getDumbledoreUserServices: () => dispatch(fetchDumbledoreUserServices()),
});

export const HermioneErrorListCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ErrorListCard));
