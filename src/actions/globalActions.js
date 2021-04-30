import { OPEN_RSS_PLAYER } from "./constables";


export const OpenRssPlayer = ({data, state}) => {
  return(dispatch) => {
    dispatch({ type: OPEN_RSS_PLAYER, payload: { rssPlayerState: state, rssPlayerData: data } });
  }
};
