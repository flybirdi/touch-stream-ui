import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { css } from '@emotion/core';
import { contentLimit, navLink } from 'theme';
import { connect } from 'react-redux';
import metaLang from 'consts/meta-lang.json';
import { signOut } from 'api/auth';

const HeaderCss = css`
top: 0;
width: 100%;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,254,7,1) 33%, rgba(4,191,33,1) 66%, rgba(0,212,255,1) 100%);
  }
`;

const overlayCss = css`
  position: absolute;
  color: white;
`;

const HeaderInternalCss = css`
${contentLimit}
display: flex;
align-items: center;
justify-content: space-between;
box-sizing: border-box;
padding: 1em;
`;

export const HeaderPlain = ({ overlay, meta }) => (
  <header css={overlay === true ? css`${HeaderCss};${overlayCss}` : HeaderCss}>
    <div css={HeaderInternalCss}>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Link to="/matches">
          <div css={css`font-weight: 500;`}>{`${metaLang.name}`}</div>
          <div css={css`opacity: 0.5;`}>{`${metaLang.byline}`}</div>
        </Link>
      </div>
      <nav>
        <Link
          css={navLink}
          to="/matches"
        >
          Matches
        </Link>
        <Link
          css={navLink}
          to="/streams"
        >
          Stream keys
        </Link>
        <button
          onClick={signOut}
          type="button"
          css={navLink}
        >
          Sign Out
        </button>
      </nav>
    </div>
  </header>
);

export const Header = connect(state => ({
  meta: state.meta,
}))(HeaderPlain);
