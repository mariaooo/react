import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers/index';
import setupSaga from '../sagas/index';
import { crashReporter, logger, sessionExtend } from '../utils';


// Create a history of your choosing (we're using a browser history in this case)

// Build the middleware for intercepting and dispatching navigation actions

const sagaMiddleware = createSagaMiddleware();
let middlewares = [sagaMiddleware, sessionExtend];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger, crashReporter];
}

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, applyMiddleware(...middlewares));
  sagaMiddleware.run(setupSaga);
  return store;
}

