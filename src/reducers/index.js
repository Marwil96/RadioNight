import { combineReducers } from "redux";
// import AudioReducer from "./AudioReducer";
import AuthReducer from "./AuthReducer";
import DatabaseReducer from "./DatabaseReducer";

export default combineReducers({
  AuthReducer: AuthReducer,
  DatabaseReducer: DatabaseReducer,
  // AudioReducer: AudioReducer,
});
