import { CREATE_USER, LOGIN_USER, CREATE_PODCAST, FETCH_ALL_USER_DATA, CREATE_AUDIO_STREAM, FETCH_EPISODE, GET_CHAT_MESSAGES, GET_NEW_CHAT_MESSAGE } from "../actions/constables";

const DatabaseReducer = (state = { podcastCreated: false, user_data: {}, loading: false, sound: {}, episodeData: {}, chatMessages: [], chatMessage: {isMod: false, message: '', message_author: {user_id: 'gjl2bgBFz4PwEGctK209aws2Lxt1', user_name: 'marwil96'}, chat_id:'1313131', time_stamp: 1642679560000 } }, action) => {
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

    case GET_CHAT_MESSAGES:
      return Object.assign({}, state, {
        chatMessages: action.payload.chat_messages,
        loading: action.payload.loading,
      });

    case GET_NEW_CHAT_MESSAGE:
      return Object.assign({}, state, {
        newMessage: action.payload.chat_message,
        loading: action.payload.loading,
      });

    case FETCH_EPISODE:
      return Object.assign({}, state, {
        episodeData: action.payload.data,
        loading: action.payload.loading,
      });

    case FETCH_ALL_USER_DATA:
      return Object.assign({}, state, {
        user_data: action.payload.user_data,
        loading: action.payload.loading,
      });
    default:
      return state;
  }
};

export default DatabaseReducer;
