import { CREATE_USER, LOGIN_USER, SIGN_OUT_USER } from "./constables";
import * as firebase from 'firebase';
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
// import firebaseConfig from "../../firebaseConfig";

const firebaseConfig = {
  apiKey: "AIzaSyDUcAND6MKchFnBsfubSTnfukGQPBy6s_8",
  authDomain: "radionight-5dc07.firebaseapp.com",
  projectId: "radionight-5dc07",
  storageBucket: "radionight-5dc07.appspot.com",
  messagingSenderId: "515591501860",
  appId: "1:515591501860:web:d8235995be6053d77400b1",
  measurementId: "G-8VBF6S6BM5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

var db = firebase.firestore();
let user = firebase.auth();
let storage = firebase.storage();

export const LoginUser = ({ email, password }) => {
  console.log('LOGIN_USER', email, password)
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      dispatch({
        type: LOGIN_USER,
        payload: { userLoggedIn: true },
      });
    }).catch(error => {
      dispatch({
        type: LOGIN_USER,
        payload: {error, userLoggedIn: false },
      });
    })
  }
};
