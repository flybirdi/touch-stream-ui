/* global localStorage, document */

import * as auth from 'api/auth';

export const FETCH = 'meta/FETCH';
export const FETCH_SUCCESS = 'meta/FETCH_SUCCESS';
export const FETCH_ERROR = 'meta/FETCH_ERROR';
export const UPDATE_FIELD = 'meta/UPDATE_FIELD';
export const AUTHORISE = 'meta/AUTHORISE';

export const initialState = {
  authenticating: true,
  credentials: typeof document === 'object' && /JWT=[^\s]*/.test(document.cookie),
  jwt: null,
  loaded: false,
};

export const login = password => (dispatch) => {
  dispatch({ type: UPDATE_FIELD, payload: { authenticating: true } });
  return auth.login(password)
    .then((res) => {
      const { jwt } = res.body;
      if (localStorage) localStorage.setItem('jwt', jwt);
      dispatch({ type: UPDATE_FIELD, payload: { jwt } });
    });
};

export const authenticateFromLocalStorage = () => (dispatch) => {
  if (!localStorage) return Promise.reject();
  const jwt = localStorage.getItem('jwt');
  if (!jwt) return Promise.reject();
  return auth.validateJWT(jwt)
    .then(() => dispatch({
      type: UPDATE_FIELD,
      payload: { jwt, authenticating: false },
    }))
    .catch((err) => {
      localStorage.removeItem('jwt');
      console.log('erro', err);
      throw err;
    });
};

export const updateField = obj => dispatch =>
  dispatch({ type: UPDATE_FIELD, payload: obj });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH:
      return Object.assign({}, initialState, { loaded: false });
    case FETCH_SUCCESS:
      return Object.assign({}, state, payload, { loaded: true });
    case FETCH_ERROR:
      return Object.assign({}, payload, { loaded: false });
    case UPDATE_FIELD:
      return Object.assign({}, state, payload, { loadStatus: 'error' });
    default:
      return state;
  }
};
