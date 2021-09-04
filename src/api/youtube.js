/* globals fetch */

import {
  handleJSON, authorisedHeaders, handleNetworkError,
} from './helpers';

export const getBroadcasts = () =>
  fetch(`${process.env.TOUCH_API_URL}/broadcasts`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const bind = (matchId, streamId) =>
  fetch(`${process.env.TOUCH_API_URL}/matches/${matchId}/stream/${streamId}`, {
    method: 'POST',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const unbind = matchId =>
  fetch(`${process.env.TOUCH_API_URL}/matches/${matchId}/stream`, {
    method: 'DELETE',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const transition = (matchId, broadcastStatus) =>
  fetch(`${process.env.TOUCH_API_URL}/matches/${matchId}/transition/${broadcastStatus}`, {
    method: 'PUT',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const createBroadcast = matchId =>
  fetch(`${process.env.TOUCH_API_URL}/matches/${matchId}/youtube`, {
    method: 'POST',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const deleteBroadcast = matchId =>
  fetch(`${process.env.TOUCH_API_URL}/matches/${matchId}/youtube`, {
    method: 'DELETE',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);
