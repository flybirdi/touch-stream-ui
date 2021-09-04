import React from 'react';
import { css } from '@emotion/core';
import Select from 'react-select';
import { filterContainer, filter, selectContainerStyle } from 'theme';
import CaretSVG from 'icons/caret.svg';

export const DivisionFilter = props => (
  <div css={css`${filterContainer}`}>
    <select
      css={css`${filter}`}
      value={props.compFilter}
      onChange={event => props.updateFilter(event.target.value)}
    >
      <option value="">All divisions</option>
      {props.divisions.map(division => (
        <option key={division.name}>{division.name}</option>
      ))}
    </select>
    <CaretSVG />
  </div>
);

const locationOpts = locations => locations
  .map(location => ({ value: location, label: location }));

export const LocationFilter = props => (
  <Select
    styles={selectContainerStyle}
    value={props.locationFilter}
    placeholder="Select location..."
    onChange={option => props.updateFilter(option)}
    isMulti
    options={locationOpts(props.locations)}
  />
);

export const YoutubeFilter = props => (
  <div css={css`${filterContainer}`}>
    <select
      css={css`${filter}`}
      value={props.youtubeFilter}
      onChange={event => props.updateFilter(event.target.value)}
    >
      <option value="">All matches</option>
      <option value="broadcasts">Broadcasts only</option>
      <option value="live">Live only</option>
    </select>
    <CaretSVG />
  </div>
);
