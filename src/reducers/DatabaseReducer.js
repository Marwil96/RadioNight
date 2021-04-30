import { CREATE_USER, LOGIN_USER, CREATE_PODCAST, FETCH_ALL_USER_DATA, CREATE_AUDIO_STREAM } from "../actions/constables";

const DatabaseReducer = (state = { podcastCreated: false, user_data: {}, loading: false, sound: {} }, action) => {
  switch (action.type) {
    case CREATE_PODCAST:
      return {
        podcastCreated: action.payload.podcast_created,
        loading: action.payload.loading,
      };

    case CREATE_AUDIO_STREAM:
      return Object.assign({}, state, {
        sound: action.payload.sound,
      });

    case FETCH_ALL_USER_DATA:
      return { user_data: action.payload.user_data, loading: action.payload.loading };
    default:
      return state;
  }
};

export default DatabaseReducer;
