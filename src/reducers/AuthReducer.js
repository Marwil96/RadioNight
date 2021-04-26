import {
  CREATE_USER,
  LOGIN_USER,
  SIGN_OUT_USER,
} from "../actions/constables";

const AuthReducer = (
  state = {
    userLoggedIn: false
  },
  action
) => {
  switch (action.type) {
    case SIGN_OUT_USER:
      return {
        userLoggedIn: false,
      };
    case LOGIN_USER:
      return {
        userLoggedIn: action.payload.userLoggedIn,
      };
    case CREATE_USER:
      return {
        userLoggedIn: action.payload.userLoggedIn,
      };
    default:
      return state;
  }
};

export default AuthReducer;
