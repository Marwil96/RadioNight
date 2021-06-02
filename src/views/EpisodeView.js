import React, { useEffect, useState } from 'react';
import colors from "../variables/color";
import { AntDesign } from '@expo/vector-icons'; 
import styled from "styled-components/native";
// import { MainContainer } from '../components/MainContainer';
import { Title } from '../components/Title';
import MiniPlayer from '../components/MiniPlayer';
import PodcastDetailsHeader from '../components/PodcastDetailsHeader';
import { Wrapper } from '../components/Wrapper';
import EpisodeChat from '../components/EpisodeChat';
import PodcastPanel from '../components/PodcastPanel';
import LottieView from "lottie-react-native";
import { FetchEpisode, FetchPodcastData } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
import { OpenEpisodePlayer } from '../actions/globalActions';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Span } from '../components/Span';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const TopBar = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`

const MainContainer = styled.View`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  font-family: "Manrope_400Regular";
  padding: 48px 0;
  padding-top: 16px;
  min-height: 100%;
  /* max-height: 100%; */
  width: 100%;
  height: 108%;
  position: absolute;
`;

const Container = styled.View`
  padding: 0 16px;
  background: ${colors.background};
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
`;

const LeftColumn = styled.View`
  display: flex;
  flex-direction: row;
`;

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
const MiniPlayerTitle = styled.Text`
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

const MiniPlayerStyle = ({episode, runningEpisode, playSound, playing, restartSound, pauseSound}) => {
  return (
    <Container style={{ borderTopColor: "#000" }}>
      <Content>
        <LeftColumn>
          <CoverArt source={{ uri: episode.image }} />
          <TitleContainer>
            <MiniPlayerTitle>{episode.title}</MiniPlayerTitle>
            {/* <Subtitle>{podcast.title}</Subtitle> */}
          </TitleContainer>
        </LeftColumn>
        {/* <TouchableOpacity
            style={{padding: 10, position: 'absolute', right: 6}}
            onPress={ runningEpisode === false  || runningEpisode.title !== episode.title ? playSound : playing ? pauseSound : restartSound}
          >
            <AntDesign
              name={runningEpisode.title === episode.title ? playing ? "pause" : "play" : 'play'}
              size={24}
              color="white"
            />
          </TouchableOpacity> */}
      </Content>
    </Container>
  );
}

const EpisodeView = ({ podcast, fetchEpisodeProgressStorage, episode, playSound, stopSound, pauseSound, soundDuration, soundProgress, startedSound, runningEpisode,  playing, changeAudioPosition, slidingComplete, restartSound, runningPodcast  }) => {
  const { episode_id } = episode;
  const [displayMode, setDisplayMode] = useState('player');
  const [countDown, setCountDown] = useState({days:'00', hours: '00', minutes: '00', seconds: '00'})
  const { episodeData, loading, user_data, } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch()
  const date = new Date(episode.stream_started.episode_starts.seconds*1000);

  useEffect(() => {
    if(episode_id !== episodeData.episode_id && episodeData.episode_id !== undefined && loading !== true) {
      console.log('IF NOT EQUAL STOP SOUND',loading, episodeData, episode_id );
      stopSound()
    }
  }, [episodeData])

  useEffect(() => {
    if (episodeData?.episode_is_running !== true) {
      var countDownDate = date.getTime();

      // Update the count down every 1 second
      let x = setInterval(() => {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        setCountDown({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        });
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          setCountDown({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
          });
        }
      }, 1000);

      return () => {
        if (x !== undefined) clearInterval(x);
        x = null;
      };
    }
  }, [episodeData]);

  useEffect(() => {
    dispatch(FetchEpisode(episode_id));
  }, [episode_id]);

  useEffect(() => {
    if(episode_id === episodeData.episode_id && episodeData.episode_id !== undefined && loading !== true) {
      !playing && episodeData?.episode_is_running && playSound();
    }
  }, [episodeData]);

  // console.log(episode.stream_started.episode_starts, new Date(episode.stream_started.episode_starts.seconds*1000));
  
  return (
    <MainContainer loading={loading}>
      <KeyboardAwareScrollView>
        <View style={{display: 'flex', flexDirection: 'column', background:'blue', height: Dimensions.get('window').height - 10}}>
          <Wrapper>
            <TopBar>
              <ButtonContainer
                onPress={() =>
                  dispatch(
                    OpenEpisodePlayer({
                      data: { ...episodeData },
                      state: false,
                    })
                  )
                }
              >
                <AntDesign
                  style={{ marginRight: 12 }}
                  name="back"
                  size={24}
                  color="white"
                />
                <Title style={{ fontSize: 16 }}>Go Back</Title>
              </ButtonContainer>
              <TouchableOpacity
                onPress={() =>
                  displayMode === "player"
                    ? setDisplayMode("message_from_host")
                    : setDisplayMode("player")
                }
              >
                <Title style={{ fontSize: 16 }}>
                  {displayMode === "player"
                    ? "Message from Host"
                    : "See Player"}
                </Title>
              </TouchableOpacity>
            </TopBar>
          </Wrapper>
          {episodeData?.episode_is_running === true
            ? displayMode === "player" && (
                <Wrapper
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <LottieView
                    autoPlay
                    loop
                    style={{
                      width: 80,
                      height: 120,
                      // backgroundColor: "#eee",
                    }}
                    source={require("../assets/sound.json")}
                  />
                </Wrapper>
              )
            : displayMode === "player" && (
                <Wrapper
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Span style={{ fontSize: 18, marginBottom: 8 }}>
                    Time Left:
                  </Span>
                  <Title style={{ fontSize: 64, color: colors.primary }}>{`${
                    countDown.hours > 9
                      ? countDown.hours
                      : `0${countDown.hours}`
                  }:${
                    countDown.minutes > 9
                      ? countDown.minutes
                      : `0${countDown.minutes}`
                  }:${
                    countDown.seconds > 9
                      ? countDown.seconds
                      : `0${countDown.seconds}`
                  }`}</Title>
                </Wrapper>
              )}

          {displayMode === "message_from_host" && (
            <Wrapper
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Span style={{ fontSize: 18, marginBottom: 8 }}>
                Message from Host
              </Span>
              <Title style={{ lineHeight: 38, color: colors.primary }}>
                {episode.host_message}
              </Title>
            </Wrapper>
          )}

          {/* <MiniPlayerStyle runningEpisode={runningEpisode} pauseSound={pauseSound} episode={episode} dispatch={dispatch} playSound={playSound} playing={playing} restartSound={restartSound}/> */}

          {/* <MiniPlayer
        style={{
          position: "relative",
          background: colors.smoothBlacks,
          backgroundColor: colors.smoothBlacks,
          paddingLeft: 0,
          paddingRight: 0,
        }}
        title="Welcome to Jurassic Ar..."
        subtitle="99% Invisible"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTy7v2Vrnp5LhNS7JoKB12kyK9_gxyCjbGFdDf7MkMmXEfvo8XY"
      /> */}
          {/* <PodcastDetailsHeader
        bgColor={colors.text}
        style={{ paddingTop: 16, paddingBottom: 16, marginBottom: 0 }}
        textColor={"#000"}
        title="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        subtitle="Business & Comedy"
        desc={`The economy explained. Imagine you could call up a friend and say, "Meet me at the bar and tell me what's going on with the economy." Now imagine that's actually a fun evening.`}
      /> */}
          <PodcastPanel
            bgColor={colors.text}
            style={{ paddingTop: 16, paddingBottom: 16, marginBottom: 0 }}
            textColor={"#000"}
            title={episode.title}
            image={episode.image}
            subtitle={episode.podcast_name}
            desc={episode.desc}
            isFollowed={user_data?.followed_podcasts.includes(
              episode.podcast_id
            )}
            podcastId={episode.podcast_id}
            owner={episode.owner}
          />
          <EpisodeChat
            episodeId={episode.episode_id}
            podcastId={episode.podcast_id}
            userId={user_data?.user_id}
            userName={user_data?.user_name}
            officialBroadCast={episode.official}
            owner={episode.owner}
          />
        </View>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

export default EpisodeView;