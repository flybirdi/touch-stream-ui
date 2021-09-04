import React from 'react';
import { css } from '@emotion/core';
import teams from 'consts/teams.json';
import flags from 'icons/flags';

const versus = css`
padding: 0 1em;
`;
const teamCss = `
display: inline-block;
.flag svg {
  width: 2em;
}
`;

const Team = ({ team, short }) => {
  if (!team) return 'TBA';
  return (
    <span css={css`
        ${teamCss}
        ${!short && 'min-width: 8em;'}
    `}
    >
      <span className="flag">{flags[team] && flags[team]()}</span>
      {short ? team.toUpperCase() : teams[team].name}
    </span>
  );
};

export const TeamTD = ({ teamA, teamB, short }) => (
  <td>
    <Team team={teamA} short={short} />
    <span css={versus}>vs</span>
    <Team team={teamB} short={short} />
  </td>
);
