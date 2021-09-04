import React from 'react';
import { css } from '@emotion/core';
import { TeamTD } from 'components/TeamTD';
import { TimeFormat } from 'components/TimeFormat';
import Select from 'react-select';
import { button } from 'theme';
import Loader from 'icons/loader';
import { StatusButton } from './StatusButton';
import DeleteSVG from './x.svg';

function getStreamLabel(streams, id) {
  const stream = streams.find(str => str.id === id);
  if (!stream) return null;
  const label = ({ label: stream && stream.snippet && stream.snippet.title, value: id });
  return label;
}

export default ({
  match, toggleSelect, streams, bindStream, unbindStream,
  transition, deleteBroadcast, createBroadcast,
}) => (
  <tr>
    <td css={css`
        max-width: 2em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;`}
    >
      {match._id}
    </td>
    <td>{match.comp}</td>
    <td>{match.round}</td>
    <TeamTD
      teamA={match.teamA}
      teamB={match.teamB}
      short
    />
    <td>
      <TimeFormat
        time={match.scheduledStartTime}
      />
      <TimeFormat
        locale="Europe/London"
        time={match.scheduledStartTime}
      />
    </td>
    <td>{match.location}</td>
    <td>
      {match.youtubeId && (
      <Select
        css={css`min-width: 10em;`}
        isClearable
        isLoading={match.bindStatus === 'binding' || streams.loading}
        isDisabled={match.bindStatus === 'binding' || streams.loading}
        value={getStreamLabel(streams.items, match.stream)}
        onChange={(SelectVal) => {
          if (!SelectVal) return unbindStream(match._id);
          return bindStream(match._id, SelectVal.value);
        }}
        options={streams.items.map(stream =>
          ({ value: stream.id, label: stream.snippet.title }))}
      />
      )}
    </td>
    <td>
      {(match.broadcastStatus === 'noBroadcast' || match.broadcastStatus === 'creating') && (
        <button
          type="button"
          css={css`${button}`}
          onClick={() => createBroadcast(match._id)}
        >
          <span>{match.broadcastStatus === 'creating' && <Loader />}</span>
          <span>Create</span>
        </button>
      )}
      {(match.broadcastStatus !== 'noBroadcast' && match.broadcastStatus !== 'creating') && (
        <div css={css`
          display: flex;
          align-items: center;
          justify-content: space-around;
        `}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.youtube.com/watch?v=${match.youtubeId}`}
          >
            <img src={require('icons/yt_icon_rgb.png')} css={css`width: 1em; margin-right: 0.25em;`} />
            <span>youtube.com/watch?v={match.youtubeId}</span>
          </a>
          <button
            onClick={() => deleteBroadcast(match)}
            type="button"
            css={css`
              margin-right: 0.25em;
              padding: 0.25em;
              cursor: pointer;
              color: #ccc;
              &:hover svg {
                color: black;
              }
          `}
          >
            <DeleteSVG css={css`stroke-width: 3px; width: 1.25em; height: 1.25em;`} />
          </button>
        </div>
      )}
    </td>
    <td>
      {match.youtubeId && (
        <StatusButton
          broadcastStatus={match.broadcastStatus}
          matchId={match._id}
          transition={transition}
        />
      )}
    </td>
  </tr>
);
