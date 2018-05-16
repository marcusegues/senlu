import React from 'react';
import { isSoftwareVersionUpdated } from './util';

export const SoftwareVersionText = ({ softwareVersion }) => (
  <div style={{ color: isSoftwareVersionUpdated ? 'black' : 'red' }}>
    Softwareversion: {softwareVersion}
  </div>
);
