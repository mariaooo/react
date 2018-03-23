import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { updateConfig } from '../actions/config';
import { appDemo } from '../actions/app';
import api from '../services/api';
import mapper from '../config/mapper';


// can load some config
function loader() {
  const config = {};
  for (const key of Object.keys(mapper)) {
    const fun = require(`../config/${mapper[key]}.js`);
    if (fun) {
      config[key] = fun;
    }
  }
  return config;
}

function* init() {
  try {
    // const config = yield call(loader);
  } catch (error) {
    
  }
}


export default function* () {
  yield all([
    takeEvery('INIT', init),
    /* takeEvery(appLogout().type, getAppLogout), */
  ]);
}
