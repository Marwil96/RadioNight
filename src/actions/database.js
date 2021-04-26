import {
  CREATE_USER,
  LOGIN_USER,
  SIGN_OUT_USER,
} from "./constables";

export const Signout = ({email, password}) => {
  return (dispatch) => {
    dispatch({
      type: SIGN_OUT_USER,
      payload: { userLoggedIn: false },
    });
  }
}