// @flow
const getEnv = (): string =>
  process.env.REACT_APP_MODE === 'stag' ? '-stag' : '';

export const dumbledoreUrl = () =>
  `https://dumbledore-dot-ql-sen${getEnv()}.appspot.com`;

export const hermioneUrl = () =>
  `https://hermione-dot-ql-sen${getEnv()}.appspot.com`;

export const harryUrl = () =>
  `https://harryhls-dot-ql-sen${getEnv()}.appspot.com`;
