import React from 'react';
import { css } from '@emotion/core';

const offset = 187;
const duration = '1.4s';

const styles = css`
.spinner {
  animation: rotator ${duration} linear infinite;
}
@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}
.path {
  stroke-dasharray: ${offset};
  stroke-dashoffset: 0;
  stroke: #4285F4;
  transform-origin: center;
  animation:
    dash ${duration} ease-in-out infinite;
}

@keyframes dash {
 0% { stroke-dashoffset: ${offset}; }
 50% {
   stroke-dashoffset: ${offset / 4};
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: ${offset};
   transform:rotate(450deg);
 }
}
`;

export default () => (
  <svg
    css={styles}
    width="1em"
    height="1em"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="path"
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
);
