/* globals fetch */

import {
  handleJSON, handleNetworkError, authorisedHeaders,
} from './helpers';

export const get = () =>
  fetch(`${process.env.TOUCH_API_URL}/time-slots`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const getDays = () =>
  fetch(`${process.env.TOUCH_API_URL}/time-slots/days`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);
