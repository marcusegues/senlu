import React from 'react';
import { ErrorsByUserService } from '../ErrorsByUserService/ErrorsByUserService';
import { ErrorsDetail } from '../ErrorsDetail/ErrorsDetail';

export const ErrorsView = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ErrorsByUserService />
      <ErrorsDetail />
    </div>
  );
};
