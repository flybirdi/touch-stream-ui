import { css } from '@emotion/core';

export const contentLimit = `
width: 100%;
max-width: 1440px;
box-sizing: border-box;
margin: 0 auto;
`;

// Breakpoints
export const breakpoints = {
  xs: '480px',
  s: '960px',
  m: '1024px',
  l: '1440px',
};

export const fonts = {
  fontsBody: `-apple-system, BlinkMacSystemFont,
  Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
  Fira Sans, Droid Sans, 'Helvetica Neue', sans-serif`,
};

export const colors = {
  black: 'hsl(260, 5%, 11%)',
  lightGrey: 'hsl(260, 5%, 90%)',
  midGrey: 'hsl(260, 5%, 50%)',
};

export const borderRadius = '2px';

export const shadows = {
  base: '1px 4px 4px hsla(0, 0%, 50%, 0.1)',
};

export const globals = `
body {
  font-family: ${fonts.fontsBody};
  font-size: 14px;
  line-height: 1.5em;
  margin: 0;
  padding: 0;
  background: white;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
svg {
  stroke-width: 1.5px;
}
th {
  text-align: left;
}
input[type="text"],
input[type="email"],
input[type="password"],
select,
textarea {
  appearance: none;
  border: 1px solid ${colors.lightGrey};
  border-radius: ${borderRadius};
  box-sizing: border-box;
  padding: 1em;
  font-family: ${fonts.fontsBody};
  font-size: 1em;
  width: 100%;
}
table {
  border-collapse: collapse;
}
a, a:visited {
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
button,input[type="button"] {
  font-size: 1em;
  background: none;
  color: inherit;
  border: 0;
}
`;

export const button = `
  display: flex;
  align-items: center;
  padding: 1em;
  font-size: 1em;
  font-weight: 500;
  border: none;
  border-radius: 2px;
  background: #ffee76;
  color: #210052;
  box-shadow: 0 3px 0 rgb(204, 191, 99);
  cursor: pointer;
  white-space: nowrap;
  transition: 0.2s box-shadow, 0.2s transform;
  &:active {
    transform: translateY(3px);
    box-shadow: 0 0 0 rgb(204, 191, 99);
  }
`;

export const separator = `
  display: flex;
  border-bottom: 1px solid ${colors.lightGrey};
  border-top: 1px solid ${colors.lightGrey};
  padding: 1em;${contentLimit}`;

export const watch = `
  text-decoration: none;
  display: flex;
  align-items: center;
  svg {
    margin-left: 0.25em;
    stroke-width: 1px;
    opacity: 0.5;
  }
`;

export const filter = `
background: white;
border: 1px solid ${colors.lightGrey};
padding: 1em;
width: 100%;
`;

export const filterContainer = `
position: relative;
display: inline-block;
width: 16em;
max-width: 100%;
&:not(:last-child) {
  margin-right: 0.5em;
}
select {
  position: relative;
  z-index: 10;
  background: none;
}
svg {
  position: absolute;
  right: 0;
  top: 0;
  padding: 1.25em;
  stroke-width: 1.5px;
  transform: rotateZ(90deg);
}
`;

export const selectContainerStyle = {
  container: provided => ({
    ...provided,
    minWidth: '16em',
  }),
};

export const navLink = css`
white-space: nowrap;
margin-left: 1.5em;
display: inline-flex;
align-items: center;
cursor: pointer;
&:hover {
  text-decoration: underline;
}
`;
