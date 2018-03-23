import { all, call } from 'redux-saga/effects';
import App from './app';

export default function* root() {
  yield all([
    call(App),
  ]);
}
