import { GET_CURRENCIES, REQUEST_CURRENCIES, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state };
  case GET_CURRENCIES:
    return { ...state, currencies: Object.keys(action.currencies) };
  case FAILED_REQUEST:
    return { ...state, Error };
  default:
    return state;
  }
}

export default walletReducer;
