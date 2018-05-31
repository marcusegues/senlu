// @flow
export const dumbledoreUrl = () =>
  process.env.REACT_APP_MODE === 'stag'
    ? `https://dumbledore-dot-ql-sen-stag.appspot.com`
    : 'https://dumbledore-dot-ql-sen.appspot.com';

export const hermioneUrl = () =>
  process.env.REACT_APP_MODE === 'stag'
    ? `https://hermione-dot-ql-sen-stag.appspot.com`
    : 'https://hermione-dot-ql-sen.appspot.com';

export const harryUrl = () =>
  process.env.REACT_APP_MODE === 'stag'
    ? `https://harryhls-dot-ql-sen-stag.appspot.com`
    : 'https://harryhls-dot-ql-sen.appspot.com';
