/* global, localStorage, alert, prompt */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import {
  format, isSameDay, isBefore, addDays,
} from 'date-fns';
import CalSVG from 'icons/calendar.svg';
import Loader from 'icons/loader';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import {
  DivisionFilter, LocationFilter, YoutubeFilter,
} from 'components/filters';
import { TeamFilter } from 'components/filters/Team';
import { DateFilter } from 'components/filters/Date';
import {
  colors, contentLimit, button, separator,
} from 'theme';
import * as matchActions from './state';
import { getStreams } from '../streams/state';
import Refresh from './refresh-cw.svg';
import { Table } from './table';

function getInitial(dateRange) {
  // TODO: Check timezone
  if (!dateRange) return null;
  const same = dateRange.find(date => isSameDay(date, new Date()));
  if (same) return same;
  if (isBefore(new Date(), dateRange[0])) return dateRange[0];
  return dateRange[1];
}

const startingFilters = {
  dateFilter: JSON.parse(localStorage.getItem('dateFilter')) || getInitial(),
  youtubeFilter: JSON.parse(localStorage.getItem('youtubeFilter')),
  compFilter: JSON.parse(localStorage.getItem('compFilter')),
  locationFilter: JSON.parse(localStorage.getItem('locationFilter')) || [],
  teamFilter: JSON.parse(localStorage.getItem('teamFilter')) || [],
};

class ManageInternal extends Component {
  constructor(props) {
    super(props);
    // Start of each day
    this.state = {
      isSyncing: false,
      isLoading: true,
      ...startingFilters,
    };
  }
  componentDidMount() {
    this.props.getDays();
    this.props.getLocations();
    this.props.getDivisions();
    this.props.getTeams();
    this.getData();
  }
  getFilterOpts = () => {
    const {
      teamFilter, dateFilter, locationFilter, compFilter,
      youtubeFilter,
    } = this.state;
    const opts = {
      ...dateFilter && {
        start: format(dateFilter, 'YYYY-MM-DD'),
        end: format(addDays(dateFilter, 1), 'YYYY-MM-DD'),
      },
      ...teamFilter && { team: teamFilter.value },
      ...locationFilter.length && { location: locationFilter.map(location => location.value).join(',') },
      ...compFilter && { comp: compFilter },
      ...youtubeFilter && { broadcast: youtubeFilter },
    };
    return opts;
  }
  getData = () => {
    const opts = this.getFilterOpts();
    this.props.getMatches(opts);
    if (!this.props.streams.items.length) this.props.getStreams();
  }
  deleteBroadcast = (match) => {
    const promptInput = prompt('Type DELETE if you are sure you want to delete this video.');
    if (promptInput !== 'DELETE') return;
    this.props.deleteBroadcast(match);
  }
  bindStream = (matchId, streamId) => {
    return this.props.bind(matchId, streamId);
  }
  unbindStream = (matchId) => {
    return this.props.unbind(matchId);
  }
  transition = (matchId, broadcastStatus) => {
    return this.props.transition(matchId, broadcastStatus);
  }
  updateFilter = (type, val) => {
    this.setState((prevState) => {
      localStorage.setItem(type, JSON.stringify(val));
      return { [type]: val };
    }, () => this.getData());
  }
  sync = () => {
    const opts = this.getFilterOpts();
    // TODO: Make isSyncing part of Redux
    this.setState(() => ({ isSyncing: true }));
    this.props.syncMatches(opts)
      .then(() => this.setState(() => ({ isSyncing: false })));
  }
  render() {
    // TODO: Optimize filtering
    const {
      isSyncing,
      locationFilter, teamFilter, youtubeFilter,
      compFilter, dateFilter,
    } = this.state;
    const { matches } = this.props;
    return (
      <div id="manage" css={css`display:flex;flex-direction:column;min-height:100vh;`}>
        <Header />
        <section id="schedule">
          <div css={css`
            ${contentLimit}
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin: 1em auto;
            padding: 0 1rem;`}
          >
            <div>
              <h2>
                <span>Matches</span>&nbsp;
                <CalSVG css={css`
                  position: relative;
                  top: 3px;`}
                />
              </h2>
              <span css={css`color:${colors.midGrey}`}>
                Showing {matches.items.length} of {matches.count} matches. Limit approx. 50 broadcast insertions per day.
              </span>
            </div>
            <div css={css`display: flex;`}>
              <button
                css={css`${button};margin-right: 0.5em;`}
                onClick={this.sync}
                disabled={isSyncing}
              >
                {isSyncing && <Loader />}
                {!isSyncing && <Refresh />}
                <span css={css`margin-left: 0.25em;`}>Sync</span>
              </button>
            </div>
          </div>
          <div css={css`${separator}`}>
            <DivisionFilter
              divisions={matches.divisions}
              compFilter={compFilter}
              updateFilter={val => this.updateFilter('compFilter', val)}
            />
            <TeamFilter
              opts={matches.teams}
              teamFilter={teamFilter}
              updateFilter={val => this.updateFilter('teamFilter', val)}
            />
            <DateFilter
              dates={matches.days}
              dateFilter={dateFilter}
              updateFilter={val => this.updateFilter('dateFilter', val)}
            />
            <YoutubeFilter
              youtubeFilter={youtubeFilter}
              updateFilter={val => this.updateFilter('youtubeFilter', val)}
            />
            <LocationFilter
              locations={matches.locations}
              locationFilter={locationFilter}
              updateFilter={val => this.updateFilter('locationFilter', val)}
            />
          </div>
        </section>
        <section id="schedule-table" css={css`padding: 1em 1em 2em 1em;${contentLimit};flex-grow: 1;`}>
          <Table
            matches={matches.items}
            streams={this.props.streams}
            bindStream={this.bindStream}
            unbindStream={this.unbindStream}
            transition={this.transition}
            createBroadcast={this.props.createBroadcast}
            deleteBroadcast={this.deleteBroadcast}
            loading={matches.loading}
          />
        </section>
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({
  meta: state.meta,
  streams: state.streams,
  matches: state.matches,
}), dispatch => ({
  getStreams: () => dispatch(getStreams()),
  syncMatches: opts => dispatch(matchActions.syncMatches(opts)),
  getMatches: opts => dispatch(matchActions.get(opts)),
  getDays: () => dispatch(matchActions.getDays()),
  getDivisions: () => dispatch(matchActions.getDivisions()),
  getLocations: () => dispatch(matchActions.getLocations()),
  getTeams: () => dispatch(matchActions.getTeams()),
  createBroadcast: matchId => dispatch(matchActions.createBroadcast(matchId)),
  deleteBroadcast: match => dispatch(matchActions.deleteBroadcast(match)),
  bind: (matchId, youtubeId) => dispatch(matchActions.bind(matchId, youtubeId)),
  unbind: matchId => dispatch(matchActions.unbind(matchId)),
  transition: (matchId, broadcastStatus) =>
    dispatch(matchActions.transition(matchId, broadcastStatus)),
}))(ManageInternal);
