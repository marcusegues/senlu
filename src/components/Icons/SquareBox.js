import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

export const SquareBox = ({ onClick }) => {
  return (
    <SvgIcon style={{ height: 50 }} onClick={onClick}>
      <path d="M18.984 3c1.078 0 2.016 0.938 2.016 2.016v13.969c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.078 0-2.016-0.938-2.016-2.016v-13.969c0-1.078 0.938-2.016 2.016-2.016h13.969zM18.984 5.016h-13.969v13.969h13.969v-13.969z" />
    </SvgIcon>
  );
};
