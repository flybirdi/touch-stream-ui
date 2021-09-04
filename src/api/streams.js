/* globals fetch */

import {
  handleJSON, authorisedHeaders, handleNetworkError,
} from './helpers';

export const addStream = opts =>
  fetch(`${process.env.TOUCH_API_URL}/streams`, {
    method: 'POST',
    headers: authorisedHeaders(),
    body: JSON.stringify(opts),
  }).then(handleJSON, handleNetworkError);

export const getStreams = () =>
  fetch(`${process.env.TOUCH_API_URL}/streams`, {
    method: 'GET',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const deleteStream = streamId =>
  fetch(`${process.env.TOUCH_API_URL}/streams/${streamId}`, {
    method: 'DELETE',
    headers: authorisedHeaders(),
  }).then(handleJSON, handleNetworkError);

export const renameStream = (id, title) =>
  fetch(`${process.env.TOUCH_API_URL}/streams/${id}`, {
    method: 'PUT',
    headers: authorisedHeaders(),
    body: JSON.stringify({ title }),
  }).then(handleJSON, handleNetworkError);
