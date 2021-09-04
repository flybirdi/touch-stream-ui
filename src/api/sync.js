/* globals fetch */

import {
  handleJSON, authorisedHeaders, handleNetworkError,
} from './helpers';

export const syncMatches = () =>
  fetch(`${process.env.TOUCH_API_URL}/sync`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);
