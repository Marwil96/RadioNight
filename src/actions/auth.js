import { CREATE_USER, LOGIN_USER, SIGN_OUT_USER } from "./constables";
import firebase from "firebase";
import {firebaseConfig} from "../../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();
let user = firebase.auth();
let storage = firebase.storage();


export const LoginUser = ({ email, password }) => {
  console.log(email, password)
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      console.log("LOGIN_USER")
      dispatch({
        type: LOGIN_USER,
        payload: { userLoggedIn: true },
      });
    }).catch(error => {
      dispatch({
        type: LOGIN_USER,
        payload: { userLoggedIn: false },
      });
    })
  }
};
export const SignUpUser = ({ email, password, userName }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER, payload: { loading: true, error: null } });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        const dataSet = await db
          .collection("users")
          .doc(response.user.uid)
          .set({
            email: email,
            user_id: response.user.uid,
            verified_email: false,
            first_time: true,
            user_name: userName,
            user_id: response.user.uid,
          });

        dispatch({
          type: CREATE_USER,
          payload: { userLoggedIn: true, loading: false },
        });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({
          type: CREATE_USER,
          payload: { error, userLoggedIn: false },
        });
      });
  };
};


