/* globals document */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Global, css } from '@emotion/core';
import { globals } from 'theme';
import Matches from 'matches';
import Streams from 'streams';
import Authentication from 'public';
import createStore from 'state/createStore';
import { authenticateFromLocalStorage } from 'state/meta';
import startWs from './ws';

if (module.hot) {
  module.hot.accept();
}

export const store = createStore();
startWs(store);

function start() {
  render(
    <Provider store={store}>
      <Global styles={css(globals)} />
      <Router>
        <div id="router">
          <Route exact path="/" component={Authentication} />
          <Route path="/matches" component={Matches} />
          <Route path="/streams" component={Streams} />
        </div>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
}

authenticateFromLocalStorage()(store.dispatch)
  .then(start).catch(start);
// TODO: Use custom history to react-router to move to / on catch
