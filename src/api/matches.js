/* globals fetch */

import queryString from 'query-string';
import {
  handleJSON, authorisedHeaders, handleNetworkError,
} from './helpers';

export const getMatches = () =>
  fetch(`${process.env.TOUCH_API_URL}/matches`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const getAuthorised = (opts) => {
  const query = opts && `?${queryString.stringify(opts)}`;
  return fetch(`${process.env.TOUCH_API_URL}/matches${query}`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);
};

export const getDivisions = () =>
  fetch(`${process.env.TOUCH_API_URL}/divisions`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const getLocations = () =>
  fetch(`${process.env.TOUCH_API_URL}/locations`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);
