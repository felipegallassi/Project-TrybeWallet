import { LOADING_TRUE, RESPONSE } from '../actions';

const INITIAL_STATE = {
  currency: 'BRL',
  currencies: [],
  expenses: [],
  Loading: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_TRUE:
    return {
      ...state,
      Loading: true,
    };
  case RESPONSE:
    return {
      ...state,
      currencies: action.payload,
      Loading: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
