/* global alert */

import * as matchesApi from 'api/matches';
import * as syncApi from 'api/sync';
import * as timeslotsApi from 'api/timeslots';
import * as teamsApi from 'api/teams';
import * as youtubeApi from 'api/youtube';

export const FETCH = 'matches/FETCH';
export const FETCH_SUCCESS = 'matches/FETCH_SUCCESS';
export const FETCH_ERROR = 'matches/FETCH_ERROR';

export const UPDATE = 'matches/UPDATE';
export const UPDATE_FIELD = 'matches/UPDATE_FIELD';

export const getDays = () => (dispatch) => {
  timeslotsApi.getDays()
    .then(res => dispatch({
      type: UPDATE_FIELD,
      payload: { days: res.body },
    }));
};

export const getTeams = () => (dispatch) => {
  teamsApi.get()
    .then(res => dispatch({
      type: UPDATE_FIELD,
      payload: { teams: res.body },
    }));
};

export const getLocations = () => (dispatch) => {
  matchesApi.getLocations()
    .then(res => dispatch({
      type: UPDATE_FIELD,
      payload: { locations: res.body },
    }));
};

export const getDivisions = () => (dispatch) => {
  matchesApi.getDivisions()
    .then(res => dispatch({
      type: UPDATE_FIELD,
      payload: { divisions: res.body },
    }));
};

export const get = opts => (dispatch) => {
  dispatch({ type: FETCH });
  return matchesApi.getAuthorised(opts)
    .then(data => dispatch({
      type: FETCH_SUCCESS,
      payload: {
        items: data.body.items,
        count: data.body.count,
      },
    }));
};

export const syncMatches = opts => dispatch => {
  console.log(opts)
  return syncApi.syncMatches().then(() => get(opts)(dispatch));
}

export const createBroadcast = matchId => (dispatch) => {
  dispatch({
    type: UPDATE,
    payload: {
      id: matchId,
      broadcastStatus: 'creating',
    },
  });
  return youtubeApi.createBroadcast(matchId)
    .catch((err) => {
      dispatch({
        type: UPDATE,
        payload: {
          id: matchId,
          broadcastStatus: 'noBroadcast',
        },
      });
      console.log(err);
      alert('Failed to create broadcast. See console for error.');
    });
};

export const transition = (matchId, broadcastStatus) => (dispatch) => {
  dispatch({
    type: UPDATE,
    payload: {
      id: matchId,
      transitionStatus: 'transitioning',
    },
  });
  return youtubeApi.transition(matchId, broadcastStatus)
    .catch((err) => {
      dispatch({
        type: UPDATE,
        payload: {
          id: matchId,
          transitionStatus: 'failed',
        },
      });
      console.log(err);
      alert('Transition failed. See console for error. Most likely, stream is not active or not receiving enough data.');
    });
};

export const bind = (matchId, streamId) => (dispatch) => {
  dispatch({
    type: UPDATE,
    payload: {
      id: matchId,
      bindStatus: 'binding',
    },
  });
  return youtubeApi.bind(matchId, streamId)
    .catch((err) => {
      dispatch({
        type: UPDATE,
        payload: {
          id: matchId,
          bindStatus: 'failed',
        },
      });
      console.log(err);
      alert('Failed to create broadcast. See console for error.');
    });
};

export const unbind = matchId => (dispatch) => {
  dispatch({
    type: UPDATE,
    payload: {
      id: matchId,
      bindStatus: 'binding',
    },
  });
  return youtubeApi.unbind(matchId)
    .catch((err) => {
      console.log(err);
      dispatch({
        type: UPDATE,
        payload: {
          id: matchId,
          bindStatus: 'failed',
        },
      });
      alert('Failed to create broadcast. See console for error.');
    });
};

export const deleteBroadcast = match => (dispatch) => {
  dispatch({
    type: UPDATE,
    payload: {
      id: match._id,
      broadcastStatus: 'deleting',
    },
  });
  return youtubeApi.deleteBroadcast(match._id)
    .catch((err) => {
      dispatch({
        type: UPDATE,
        payload: {
          id: match._id,
          broadcastStatus: match.broadcastStatus,
        },
      });
      console.log(err);
      alert('Failed to create broadcast. See console for error.');
    });
};

export const initialState = {
  items: [],
  days: [],
  divisions: [],
  locations: [],
  teams: [],
  loading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH:
      return Object.assign({}, state, { loading: true });
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        items: [...payload.items],
        count: payload.count,
        loading: false,
      });
    case FETCH_ERROR:
      return Object.assign({}, state, { loading: false });
    case UPDATE: {
      const items = state.items.map((match) => {
        if (match._id === payload.id) return Object.assign({}, match, payload);
        return match;
      });
      return Object.assign({}, state, { items });
    }
    case UPDATE_FIELD: {
      return Object.assign({}, state, payload);
    }
    default:
      return state;
  }
};
