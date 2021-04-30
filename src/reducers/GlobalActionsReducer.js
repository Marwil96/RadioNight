import {OPEN_RSS_PLAYER } from "../actions/constables";

const GlobalActionsReducer = (state = { rssPlayerState: false, rssPlayerData: {}}, action) => {
  switch (action.type) {
    case OPEN_RSS_PLAYER:
       return {
         rssPlayerState: action.payload.rssPlayerState,
         rssPlayerData: action.payload.rssPlayerData,
       };
    default:
      return state;
  }
};

export default GlobalActionsReducer;
