/* globals fetch */

import {
  handleJSON, handleNetworkError, authorisedHeaders,
} from './helpers';

export const get = () =>
  fetch(`${process.env.TOUCH_API_URL}/teams`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);
