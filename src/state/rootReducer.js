import { combineReducers } from 'redux';
import streams from 'streams/state';
import matches from 'matches/state';
import meta from './meta';

export default combineReducers({
  meta,
  streams,
  matches,
});
