import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

export const TrafficLight = ({ onClick, color }) => (
  <svg
    viewBox="0 0 125 62"
    width="50"
    height="25"
    style={{ display: 'flex', alignItems: 'center' }}
  >
    <g>
      <rect
        x="5"
        y="5"
        rx="10"
        ry="10"
        width="110"
        height="40"
        stroke="black"
        fill="black"
      />
      {(() => {
        switch (color) {
          case 'red':
            return <circle cx="25" cy="25" r="15" fill="red" />;
          case 'yellow':
            return <circle cx="60" cy="25" r="15" fill="yellow" />;
          default:
            return <circle cx="95" cy="25" r="15" fill="green" />;
        }
      })()}
    </g>
  </svg>
);
