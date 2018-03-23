import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../container';
// import { NotFound } from '../components';
import init from './init';

const createRoutes = (store) => {
  const routers = (
    <Route path="/" >
      {/* when enter router, there will init */}
      <IndexRoute onEnter={init(store)} />
      <Route path="demo" component={App}>
        { /*<IndexRoute
          onEnter={(nextState, replace) => {
            replace({ pathname: '/some other component' });
          }}
        />
        <Route
          path="some other component"
          getComponent={(location, cb) => {
            cb(null, 'OtherComponent');
          }}
        />
        <Route
          path="syserror"
          getComponent={(location, cb) => {
            cb(null, 'syserror');
          }}
        />*/ }
      </Route>
      {/*<Route
        path="*"
        status={404}
        getComponent={(nextState, callback) => {
          callback(null, NotFound);
        }}
      />*/}
    </Route>
  );
  return routers;
};

export default createRoutes;
