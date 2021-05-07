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
import { FetchEpisode } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { OpenEpisodePlayer } from '../actions/globalActions';
import { TouchableOpacity } from 'react-native';

const TopBar = styled.View`
  width: 100%;
`

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`

const MainContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  font-family: "Manrope_400Regular";
  padding: 48px 0;
  padding-top: 16px;
  min-height: 100%;
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
    <Container style={{ borderTopColor: '#000'}} >
      <Content >
        <LeftColumn>
          <CoverArt source={{ uri: episode.image}} />
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
  )
}

const EpisodeView = ({ podcast, fetchEpisodeProgressStorage, episode, playSound, pauseSound, soundDuration, soundProgress, startedSound, runningEpisode,  playing, changeAudioPosition, slidingComplete, restartSound, runningPodcast  }) => {
  const { episode_id } = episode;
  const { episodeData, loading } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FetchEpisode(episode_id))
    !playing && playSound()
  }, [])
  
  console.log(episode_id, episodeData);
  return (
    <MainContainer loading={loading}>
      <Wrapper>
        <TopBar>
          <ButtonContainer onPress={() => dispatch(OpenEpisodePlayer({data: {...episodeData}, state: false}))}>
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

      <MiniPlayerStyle runningEpisode={runningEpisode} pauseSound={pauseSound} episode={episode} dispatch={dispatch} playSound={playSound} playing={playing} restartSound={restartSound}/>
      
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
        title="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        subtitle="Business & Comedy"
        desc={`The economy explained. Imagine you could call up a friend and say, "Meet me at the bar and tell me what's going on with the economy." Now imagine that's actually a fun evening.`}
      />
      <EpisodeChat />
    </MainContainer>
  );
};

export default EpisodeView;