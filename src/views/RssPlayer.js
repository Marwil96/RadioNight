import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import colors from "../variables/color";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { MainContainer } from "../components/MainContainer";
import { Title } from "../components/Title";

import MiniPlayer from "../components/MiniPlayer";
import PodcastDetailsHeader from "../components/PodcastDetailsHeader";
import { Wrapper } from "../components/Wrapper";
import EpisodeChat from "../components/EpisodeChat";
import PodcastPanel from "../components/PodcastPanel";
import { Span } from "../components/Span";
import { TouchableOpacity} from "react-native";
import Slider from "@react-native-community/slider";

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

const RssPlayer = ({ navigation, route }) => {
  const {podcast, mode, episode} = route.params;
  const [sound, setSound] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [startedSound, setStartedSound] = useState(false);
  const [soundDuration, setSoundDuration] = useState(100000);
  const [soundProgress, setSoundProgress] = useState(1);

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({uri: episode.enclosures[0].url});
    sound.setOnPlaybackStatusUpdate(updateStatus);
    Audio.setAudioModeAsync({ staysActiveInBackground: true});
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    setPlaying(true);
  }

  const updateStatus = (status) => {
    // console.log(status.positionMillis, status.durationMillis);
    setSoundDuration(status.durationMillis);
    setSoundProgress(status.positionMillis)
  }

  const pauseSound = async () => {
    await sound.pauseAsync();
    setPlaying(false);
  }

  const restartSound = async () => {
    await sound.playAsync();
    setPlaying(true);
  };

  const changeAudioPosition = async (value) => {
    console.log(value)
    await sound.pauseAsync();
    setPlaying(false);
    setSoundProgress(value);
    // soundObject.setStatusAsync(statusToSet)
  }

  const slidingComplete = async (e) => {
    console.log("SLIDING COMPLETE")
    sound.playFromPositionAsync(soundProgress);
    await sound.playAsync();
    setPlaying(true);
  }
  
  useEffect(() => {
    const asyncFunction = async () => {
      if(sound !== false) {
        console.log(sound)
      }
    }

    asyncFunction()
  }, [sound])

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // console.log('MATH', soundProgress, soundDuration, Math.floor(soundProgress / soundDuration), 0/0);

  return (
    <MainContainer>
      <Wrapper>
        <TopBar>
          <ButtonContainer onPress={() => navigation.goBack()}>
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
          style={{ width: "100%", alignSelf: "stretch" }}
          value={soundProgress}
          maximumTrackTintColor={colors.primary}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
          disabled={sound === false}
          maximumValue={soundDuration}
          onValueChange={(value) => changeAudioPosition(value)}
          onSlidingComplete={(e) => slidingComplete(e)}
          minimumValue={0}
        />
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={
            sound === false ? playSound : playing ? pauseSound : restartSound
          }
        >
          <AntDesign name="play" size={48} color="white" />
        </TouchableOpacity>
      </PlayerWrapper>
    </MainContainer>
  );
};

export default RssPlayer;
