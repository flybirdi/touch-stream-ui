import React from 'react';
import { css } from '@emotion/core';
import { contentLimit, colors } from 'theme';
import metaLang from 'consts/meta-lang.json';
import BirdiLogo from './birdi-logo.svg';

const FooterCss = css`
  position: relative;
  display: block;
  border-top: 1px solid ${colors.lightGrey};
  color: ${colors.midGrey};
  width: 100%;
  a {
    text-decoration: underline;
  }
  &::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,254,7,1) 33%, rgba(4,191,33,1) 66%, rgba(0,212,255,1) 100%);
  }
`;

const InternalCss = css`
${contentLimit}
display: flex;
align-items: center;
justify-content: space-between;
box-sizing: border-box;
padding: 2em;
& .partners {
  a {
    height: 2.5em;
    &:not(:last-child) {
      margin-right: 1em;
    }
  }
  img {
    height: 2.5em;
  }
}
`;

export const Footer = () => (
  <footer css={FooterCss}>
    <div css={InternalCss}>
      <div css={css`max-width:32em;`}>
      touch-stream<br /> <a href="https://github.com/flybirdi/touch-stream" target="_blank" rel="noopener noreferrer">github.com/flybirdi/touch-stream</a>
      </div>
      <div css={css`display: flex; align-items: center;`}>
        <a href="https://birdi.com.au" target="_blank" rel="noopener noreferrer">
          <BirdiLogo css={css`width: 3em; height: 3em;`} />
        </a>
        <a href="https://www.internationaltouch.org/" target="_blank" rel="noopener noreferrer">
          <img
            alt="FIT International Touch"
            src={require('./fit-logo.png')}
            css={css`
            width: auto;
            height: 2.5em;
            margin-left: 0.5em;`}
          />
        </a>
      </div>
    </div>
  </footer>
);
