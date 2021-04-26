import { CREATE_USER, LOGIN_USER, SIGN_OUT_USER } from "./constables";

export const LoginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER,
      payload: { userLoggedIn: true },
    });
  };
};
