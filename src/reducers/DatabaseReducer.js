import { CREATE_USER, LOGIN_USER, CREATE_PODCAST, FETCH_ALL_USER_DATA } from "../actions/constables";

const DatabaseReducer = (state = { podcastCreated: false, user_data: {}, loading: false }, action) => {
  switch (action.type) {
    case CREATE_PODCAST:
      return {
        podcastCreated: action.payload.podcast_created,
        loading: action.payload.loading,
      };

    case FETCH_ALL_USER_DATA:
      return {...action.payload};
    default:
      return state;
  }
};

export default DatabaseReducer;
