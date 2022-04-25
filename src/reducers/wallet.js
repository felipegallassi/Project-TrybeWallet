import { LOADING_TRUE, RESPONSE, GET_EXPENSES } from '../actions';

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
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}

export default walletReducer;
