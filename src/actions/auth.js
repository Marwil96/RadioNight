import { CREATE_USER, LOGIN_USER, SIGN_OUT_USER, UPDATE_USER_STATUS } from "./constables";
import firebase from "firebase";
import {firebaseConfig} from "../../firebaseConfig";
import { FetchAllUserData } from "./database";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();
let user = firebase.auth();
let storage = firebase.storage();


export const LoginUser = ({ email, password }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      dispatch(FetchAllUserData());
      dispatch({
        type: LOGIN_USER,
        payload: { userLoggedIn: true },
      });
    }).catch(error => {
      console.log(error)
      dispatch({
        type: LOGIN_USER,
        payload: { userLoggedIn: false },
      });
    })
  }
};

export const SignOutUser = () => {
  // if (isFunction(unsubscribeProfileData)) unsubscribeProfileData();
  // if (isFunction(unsubscribeCollections)) unsubscribeCollections();
  // if (isFunction(unsubscribeRecipeCollections)) unsubscribeRecipeCollections();
  // if (isFunction(unsubscribeCollectionRecipes)) unsubscribeCollectionRecipes();
  // if (isFunction(unsubscribePersonalRecipes)) unsubscribePersonalRecipes();
  // if (isFunction(unsubscribeAllRecipes)) unsubscribeAllRecipes();
  // if (isFunction(unsubscribeAllCollections)) unsubscribeAllCollections();
  // if (isFunction(unsubscribeRecipes)) unsubscribeRecipes();
  // if (isFunction(unsubscribeFetchPlan)) unsubscribeFetchPlan();
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then((response) => {
        dispatch({ type: SIGN_OUT_USER, payload: { userLoggedIn: false } });
      })
      .catch((error) => {
        dispatch({ type: SIGN_OUT_USER, payload: { error: true } });
      });
  };
};

export const UpdateUserStatus = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: UPDATE_USER_STATUS,
          payload: { userLoggedIn: true, user_id: user.uid },
        });
      } else {
        dispatch({
          type: UPDATE_USER_STATUS,
          payload: { userLoggedIn: false },
        });
      }
    });
  };
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
            mods: [response.user.uid],
            invited_to_mod: [],
            followed_podcasts: [],
            owned_podcasts: [],
            user_image: false,
            banned_users: [],
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


