import * as actions from '../actions/app';

// you can do some init opration, like load config or get customr info
const init = store => (nextState, replace) => {
  // store.dispatch({ type: 'INIT' });
  replace({
    pathname: '/demo',
  });
};

export default init;
