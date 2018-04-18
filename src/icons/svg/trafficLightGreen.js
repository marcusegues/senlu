import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

export const TrafficLightGreen = ({ onClick }) => (
  <svg height="250" width="300">
    <path
      d="M10 10 h 75 a 5 5 0 0 v 20 h -80 L 10 10"
      fill="white"
      stroke="black"
      strokeWidth="1"
    />
  </svg>
);

//
// <SvgIcon onClick={onClick}>
//     {/*<path d="M18.984 3c1.078 0 2.016 0.938 2.016 2.016v13.969c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.078 0-2.016-0.938-2.016-2.016v-13.969c0-1.078 0.938-2.016 2.016-2.016h13.969zM18.984 5.016h-13.969v13.969h13.969v-13.969z" />*/}
//     {/*<path d="M10 10 h 80 v 80 h -80 L 10 10" fill="red" stroke="black" />*/}
//     <path d="M10 10 h 80 v 80 h -80 L 10 10" fill="red" stroke="black" />
//
//
// </SvgIcon>
