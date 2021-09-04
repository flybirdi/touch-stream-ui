import { store } from '../index';

/**
 * @param {string} error message
 * @param {status} HTTP status to return
 * @param {status} baseError in the event that we are responding to
 * an error that could be ambiguous, pass the original error too
 */
function APIError(name = 'APIError', status, message) {
  Object.defineProperty(this, 'name', {
    enumerable: false,
    writable: true,
    value: name,
  });
  Object.defineProperty(this, 'message', {
    enumerable: false,
    writable: true,
    value: message,
  });
  Object.defineProperty(this, 'status', {
    enumerable: false,
    writable: true,
    value: status,
  });
}
Object.setPrototypeOf(APIError.prototype, Error.prototype);

// Default headers for interacting with JSON API
export const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};

export function getValidToken() {
  if (store === 'undefined') return '';
  return store.getState().meta.jwt;
}

export function authorisedHeaders() {
  return Object.assign({}, headers, {
    Authorization: `Bearer ${getValidToken()}`,
  });
}

// Fetch utility for parsing BIRDI API responses
export const handleJSON = response =>
  response.text()
    .then((bodyText) => {
      // 500 errors
      if (response.status >= 500) {
        // eslint-disable-next-line prefer-promise-reject-errors
        throw new APIError(
          'ServerError',
          response.status,
        );
      }
      // Determine JSON Headers
      const hasJSONHeader = response.headers.get('Content-Type')
      && response.headers.get('Content-Type').toLowerCase().includes('application/json');
      // No JSON so no parse JSON:
      if ((response.ok && !bodyText.length) || (response.ok && !hasJSONHeader)) {
        return {
          type: 'Success',
          status: response.status,
          body: '',
        };
      }
      // Parse JSON
      let parsedJSON = null;
      try {
        if (bodyText.length) parsedJSON = JSON.parse(bodyText);
      } catch (err) {
        // JSON parsing error despite JSON headers
        throw new APIError(
          'JSONParseError',
          response.status,
          bodyText,
        );
      }
      // Good JSON (200 status)
      if (response.ok) {
        const ok = {
          type: 'Success',
          status: response.status,
          body: parsedJSON,
        };
        return ok;
      }
      // Bad JSON
      throw new APIError(
        'ApplicationError',
        response.status,
        parsedJSON,
      );
    });

export const handleNetworkError = () => {
  throw new APIError('NetworkError');
};
