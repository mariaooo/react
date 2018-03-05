import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux'
import reducers from '../reducers/index';
import setupSaga from '../sagas/index';
import logger from '../utils/logger';
import crashReporter from '../utils/crashReporter';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
let middlewares = [sagaMiddleware, historyMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger, crashReporter];
}

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, applyMiddleware(...middlewares));
  sagaMiddleware.run(setupSaga);
  return store;
}

