import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import colors from "../variables/color";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
// import { MainContainer } from "../components/MainContainer";
import { Title } from "../components/Title";

import MiniPlayer from "../components/MiniPlayer";
import PodcastDetailsHeader from "../components/PodcastDetailsHeader";
import { Wrapper } from "../components/Wrapper";
import EpisodeChat from "../components/EpisodeChat";
import PodcastPanel from "../components/PodcastPanel";
import { Span } from "../components/Span";
import { TouchableOpacity} from "react-native";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import { OpenRssPlayer } from "../actions/globalActions";
// import { PlaySound } from "../actions";

const TopBar = styled.View`
  width: 100%;
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const CoverArt = styled.Image`
  height:261px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const PlayerWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 16px;
`

const PlayerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const MainContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  font-family: "Manrope_400Regular";
  padding: 48px 0;
  min-height: 100%;
`;

const RssPlayer = ({ route, podcast, episode, playSound, pauseSound, soundDuration, soundProgress, startedSound,  playing, changeAudioPosition, slidingComplete, restartSound }) => {
  // const {podcast, mode, episode} = route.params;
  // const { sound } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch();
  // const [playing, setPlaying] = useState(false);
  // const [startedSound, setStartedSound] = useState(false);
  // const [soundDuration, setSoundDuration] = useState(100000);
  // const [sound, setSound] = useState(100000);
  // const [soundProgress, setSoundProgress] = useState(1);

  // const playSound = async () => {
  //   console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync({uri: episode.enclosures[0].url});
  //   sound.setOnPlaybackStatusUpdate(updateStatus);
  //   Audio.setAudioModeAsync({ staysActiveInBackground: true});
  //   setSound(sound);

  //   console.log("Playing Sound");
  //   await sound.playAsync();
  //   setPlaying(true);
  // }

  // const playSound = async () => {
  //   console.log("Loading Sound");
  //   const { sound } = await startAudio(episode.enclosures[0].url);
  //   sound.setOnPlaybackStatusUpdate(updateStatus);
  //   setSound(sound);
  //   setPlaying(true);
  // };

  // const updateStatus = (status) => {
  //   // console.log(status.positionMillis, status.durationMillis);
  //   setSoundDuration(status.durationMillis);
  //   setSoundProgress(status.positionMillis);
  // };

  // const pauseSound = async () => {
  //   await sound.pauseAsync();
  //   setPlaying(false);
  // };

  // const restartSound = async () => {
  //   await sound.playAsync();
  //   setPlaying(true);
  // };

  // const changeAudioPosition = async (value) => {
  //   console.log(value);
  //   await sound.pauseAsync();
  //   setPlaying(false);
  //   setSoundProgress(value);
  //   // soundObject.setStatusAsync(statusToSet)
  // };

  // const slidingComplete = async (e) => {
  //   console.log("SLIDING COMPLETE");
  //   sound.playFromPositionAsync(soundProgress);
  //   await sound.playAsync();
  //   setPlaying(true);
  // };

  // useEffect(() => {
  //   const asyncFunction = async () => {
  //     if (sound !== false) {
  //       console.log(sound);
  //     }
  //   };

  //   asyncFunction();
  // }, [sound]);

  // useEffect(() => {
  //   console.log("HEELLOO", sound);
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  // console.log('MATH', soundProgress, soundDuration, Math.floor(soundProgress / soundDuration), 0/0);

  return (
    <MainContainer>
      <Wrapper>
        <TopBar>
          <ButtonContainer
            onPress={() => dispatch(OpenRssPlayer({data: {episode: {...episode}, podcast: {...podcast}}, state: false}))}
          >
            <AntDesign
              style={{ marginRight: 12 }}
              name="back"
              size={24}
              color="white"
            />
            <Title style={{ fontSize: 16 }}>Go Back</Title>
          </ButtonContainer>
        </TopBar>
      </Wrapper>
      <PlayerWrapper>
        <CoverArt
          source={{
            uri:
              episode.itunes.image !== undefined
                ? episode.itunes.image
                : podcast.image,
          }}
        />
        <Title style={{ marginBottom: 4 }}>{episode.title}</Title>
        <Span style={{ color: colors.unFocused }}>{podcast.title}</Span>
        <Slider
          style={{ width: "100%" }}
          value={soundProgress}
          maximumTrackTintColor={colors.primary}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
          // disabled={sound === false}
          maximumValue={soundDuration}
          onValueChange={(value) => changeAudioPosition(value)}
          onSlidingComplete={(e) => slidingComplete(e)}
          minimumValue={0}
        />
        <PlayerContainer>
          <TouchableOpacity
            style={{ padding: 10 }}
            // onPress={
            //   sound === false ? () => dispatch(PlaySound(episode.enclosures[0].url)) : playing ? pauseSound : restartSound
            // }
            onPress={ startedSound === false ? playSound : playing ? pauseSound : restartSound}
          >
            <AntDesign
              name={playing ? "pause" : "play"}
              size={48}
              color="white"
            />
          </TouchableOpacity>
        </PlayerContainer>
      </PlayerWrapper>
    </MainContainer>
  );
};

export default RssPlayer;
