import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import { createRoutes } from './routes';

const store = configureStore();
const routes = createRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store} >
    { /* ConnectedRouter will use the store from Provider automatically */}
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
