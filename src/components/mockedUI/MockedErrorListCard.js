// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import { ServiceRow } from '../ErrorList/subcomponents/ServiceRow/ServiceRow';
import { userServices } from '../../types/index';

// mock data
const data = {};
// eslint-disable-next-line no-return-assign
userServices.map(service => (data[service] = null));
// add errors on some services
data['Linear TV OTT'] = [];
// data['VoD'].errors = [];
// data['Linear TV DVB'].errors = [];
// data['Trick modes'].errors = [];

type ErrorListCardProps = {
  fetchingHermione: boolean,
  classes: Object,
};

const styles = {
  root: {
    width: '100%',
    overFlow: 'hidden',
  },
};

class ErrorListCard extends React.Component<ErrorListCardProps, {}> {
  static handleSelectError() {
    return Promise.resolve(true);
  }

  render() {
    const { fetchingHermione, classes } = this.props;
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
              onSelectError={() => ErrorListCard.handleSelectError()}
            />
          ))}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  customerId: state.api.customerId,
  fetchingHermione: state.api.fetchingHermione,
  data: state.api.data,
});

export const MockedErrorListCard = connect(mapStateToProps, null)(
  withStyles(styles)(ErrorListCard)
);
