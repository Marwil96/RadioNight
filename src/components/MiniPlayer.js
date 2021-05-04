import React, { useEffect, useRef, useState } from "react";
import { PanResponder, TouchableOpacity, View, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import styled from "styled-components/native";
import colors from "../variables/color";
import { useDispatch } from "react-redux";
import { OpenRssPlayer } from "../actions/globalActions";
// import Animated from "react-native-reanimated";

const Wrapper = styled.TouchableOpacity`
  padding: 0 16px;
  background: ${colors.smoothBlack};
  /* position: absolute; */
  bottom: 0;
  right: 0;
  width: 100%;
`;

const Content = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 16px;
  align-items: center;
  justify-content: space-between;
`

const LeftColumn = styled.View`
  display: flex;
  flex-direction: row;
`

const CoverArt = styled.Image`
  height: 64px;
  width: 64px;
  margin-right: 12px;
  border-radius: 4px;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  justify-content: center;
`;
const Title = styled.Text`
  font-size: 16px;
  font-family: "Manrope_500Medium";
  margin-bottom: 3px;
  color: ${colors.text};
  flex-shrink: 1;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  font-family: "Manrope_400Regular";
  color: ${colors.text};
`;

const MiniPlayer = ({podcast, episode, playSound, pauseSound, setPlaying, setRunningEpisode, soundDuration, stopSound, soundProgress, startedSound, runningEpisode,  playing, changeAudioPosition, slidingComplete, restartSound, style}) => {
  const dispatch = useDispatch(); 

  return (
    <Wrapper style={{ borderTopColor: '#000'}} onPress={() => dispatch(OpenRssPlayer({data: {episode: {...episode}, podcast: {...podcast}}, state: true}))}>
      <Content >
        <LeftColumn>
          <CoverArt source={{ uri:
              episode.itunes.image !== undefined
                ? episode.itunes.image
                : podcast.image}} />
          <TitleContainer>
            <Title>{episode.title}</Title>
            <Subtitle>{podcast.title}</Subtitle>
          </TitleContainer>
        </LeftColumn>
        <TouchableOpacity
            style={{padding: 10, position: 'absolute', right: 6}}
            onPress={ runningEpisode === false  || runningEpisode.title !== episode.title ? playSound : playing ? pauseSound : restartSound}
          >
            <AntDesign
              name={runningEpisode.title === episode.title ? playing ? "pause" : "play" : 'play'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
      </Content>
    </Wrapper>
  );
}

export default MiniPlayer;