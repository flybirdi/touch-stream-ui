import React from 'react';
import { css } from '@emotion/core';
import { format } from 'date-fns';
import { offsetTz } from 'utils/timezone';
import CaretSVG from 'icons/caret.svg';
import { filterContainer, filter } from 'theme';

// const time = useMalayTime ? offsetTz(rawTime) : rawTime;
export const DateFilter = props => (
  <div css={css`${filterContainer}`}>
    <select
      css={css`${filter}`}
      value={props.dateFilter}
      onChange={event => props.updateFilter(event.target.value)}
    >
      {props.dates.map(date => (
        <option key={date} value={date}>{format(date, 'ddd, DD MMM')}</option>
      ))}
    </select>
    <CaretSVG />
  </div>
);
