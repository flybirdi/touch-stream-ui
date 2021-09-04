import React from 'react';
import { css } from '@emotion/core';
import { colors } from 'theme';
import LoaderIcon from 'icons/loader';
import MatchRow from './Row';

const cols = [
  'id', 'Comp', 'Round',
  'Matchup', 'Time', 'Location',
  'RTMP Source', 'Broadcast',
  'Status',
];

export const Table = props => (
  <table css={css`
    width: 100%;`}
  >
    <thead css={css`
      background: hsl(0, 0%, 90%);
      color: #0e0e0e;`}
    >
      <tr css={css`
      th {
        padding: 1em;
        font-weight: 400;
      }`}
      >
        {cols.map(col => <th key={col}>{col}</th>)}
      </tr>
    </thead>
    {/* TODO: Move this outside of table or use fake rows */}
    { props.loading && (
      <tbody>
        <tr>
          <td>
            <span css={css`margin-right: 0.25em;`}><LoaderIcon /></span>
            <span>Loading matches</span>
          </td>
        </tr>
      </tbody>
    )}
    <tbody css={css`
      td {
        padding: 2em 1em;
        border-bottom: 1px solid ${colors.lightGrey};
      }`}
    >
      {props.matches.map(match => (
        <MatchRow
          key={match._id}
          match={match}
          streams={props.streams}
          bindStream={props.bindStream}
          unbindStream={props.unbindStream}
          toggleSelect={props.toggleSelect}
          transition={props.transition}
          deleteBroadcast={props.deleteBroadcast}
          createBroadcast={props.createBroadcast}
        />
      ))}
    </tbody>
  </table>
);
