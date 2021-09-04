/* globals fetch, window, localStorage */

import {
  handleJSON, headers, handleNetworkError,
} from './helpers';

export const login = password =>
  fetch(`${process.env.TOUCH_API_URL}/auth`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      username: 'admin',
      password,
    }),
  }).then(handleJSON, handleNetworkError);

export const validateJWT = jwt =>
  fetch(`${process.env.TOUCH_API_URL}/auth/validate`, {
    method: 'GET',
    headers: Object.assign(headers, { Authorization: `Bearer ${jwt}` }),
  }).then(handleJSON, handleNetworkError);

export function signOut() {
  localStorage.removeItem('jwt');
  window.location.href = '/';
}
