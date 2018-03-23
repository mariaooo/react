import * as actions from '../constants/app';

const InitState = {
 // userful info
};

const reducer = (state = InitState, action) => {
  switch (action.type) {
    case actions.APP_DEMO:
      return {
       // you can change redux status
      };
    default:
      return state;
  }
};

export default reducer;
