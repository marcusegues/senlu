import React from 'react';
import { connect } from 'react-redux';
import { getError } from '../../../../../../../selectors';

const ErrorListRowDetailInner = ({ error }) => {
  return <div>{error.logs}</div>;
};

const mapStateToProps = (state, ownProps) => ({
  error: getError(state, ownProps.serviceId, ownProps.row.id),
});

export const ErrorListRowDetail = connect(mapStateToProps, null)(
  ErrorListRowDetailInner
);
