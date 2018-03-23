import * as appActions from '../actions/app';

const sessionExtend = store => next => (action) => {
  if ( 'when should you filter' ) {
    store.dispatch('some use filter');
  }
  return next(action);
};

export default sessionExtend;
