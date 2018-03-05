import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/index';
import App from './components/app';

const store = configureStore();

const history = createHistory();

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store} >
    { /* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
