/* global alert */

import * as streamsApi from 'api/streams';

export const ADD = 'streams/ADD';
export const ADD_SUCCESS = 'streams/ADD_SUCCESS';
export const ADD_FAILURE = 'streams/ADD_FAILURE';

export const DELETE = 'streams/DELETE';
export const DELETE_SUCCESS = 'streams/DELETE_SUCCESS';

export const RENAME = 'streams/RENAME';
export const RENAME_SUCCESS = 'streams/RENAME_SUCCESS';
export const RENAME_FAILURE = 'streams/RENAME_FAILURE';

export const FETCH = 'streams/FETCH';
export const FETCH_SUCCESS = 'streams/FETCH_SUCCESS';
export const FETCH_ERROR = 'streams/FETCH_ERROR';

export const initialState = {
  items: [],
  loading: true,
};

export const getStreams = () => (dispatch) => {
  dispatch({ type: FETCH });
  return streamsApi.getStreams()
    .then(response => dispatch({ type: FETCH_SUCCESS, payload: response.body }))
    .catch(() => {});
};

export const addStream = opts => (dispatch) => {
  dispatch({ type: ADD });
  streamsApi.addStream(opts)
    .catch((err) => {
      alert('Failed to add stream, see browser logs');
      console.log(err);
    });
};

export const deleteStream = streamId => dispatch =>
  streamsApi.deleteStream(streamId)
    .then(() => dispatch({ type: DELETE, payload: streamId }))
    .catch((err) => {
      alert('Failed to delete stream, see browser logs');
      console.log(err);
    });

export const renameStream = (id, title) => (dispatch) => {
  dispatch({
    type: RENAME,
    payload: {
      id,
      title,
    },
  });
  streamsApi.renameStream(id, title)
    .catch((err) => {
      dispatch({ type: RENAME_FAILURE });
      alert('Failed to rename stream, see browser logs');
      console.log(err);
    });
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_SUCCESS:
      return Object.assign({}, state, { items: [...payload], loading: false });
    case FETCH_ERROR:
      return Object.assign({}, state, { loading: false });
    case ADD_SUCCESS:
      return Object.assign({}, state, payload, { items: [...state.items, payload] });
    case DELETE_SUCCESS: {
      const items = state.items.filter(stream => (stream.id !== payload));
      return Object.assign({}, state, payload, { items });
    }
    case RENAME_SUCCESS:
    case RENAME: {
      const items = state.items.map((stream) => {
        if (stream.id === payload.id) {
          return Object.assign({}, stream, {
            snippet: Object.assign({}, stream.snippet, { title: payload.title }),
          });
        }
        return stream;
      });
      return Object.assign({}, state, payload, { items });
    }
    default:
      return state;
  }
};
