import { EMAIL_ACTION } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_ACTION:
    return { ...state, ...action.user };
  default:
    return state;
  }
}

export default userReducer;
