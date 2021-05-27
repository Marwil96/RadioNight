import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { FetchYourCommunityPremieres, FetchYourPodcasts } from '../actions';
import { MainContainer } from '../components/MainContainer';
import PodcastCard from '../components/PodcastCard';
import StyledButton from '../components/StyledButton';
import { Title } from '../components/Title';
import TopNav from '../components/TopNav';
import { Wrapper } from '../components/Wrapper';

const YourPodcasts = ({navigation}) => {
  const [podcasts, setPodcasts] = useState([]);
  const [livePremieres, setLivePremieres] = useState([]);
  const [loading, setLoading] = useState(false)
  const { user_data } = useSelector((state) => state.DatabaseReducer);


  const FetchData = async () => {
    setLoading(true)
    const podcastsData = await FetchYourPodcasts(user_data.owned_podcasts);
    const premieres = await FetchYourCommunityPremieres();
    setLivePremieres(premieres.liveEpisodes);
    setPodcasts(podcastsData);
    setLoading(false)
  };
  
  useEffect(() => {
    if(user_data !== undefined) {
      FetchData();
    }
  }, [user_data])
  
  return (
    <MainContainer loading={loading}>
      <TopNav onRefresh={() => FetchData()} />
      {livePremieres.length > 0 && (
        <Title
          style={{
            marginLeft: 16,
          }}
        >
          Live Community Premieres
        </Title>
      )}
      {livePremieres.length > 0 &&
        livePremieres.map((episode, index) => (
          <PodcastCard
            title={episode.title}
            subtitle={episode.podcast_name}
            key={index}
            onPress={() => {
              navigation.navigate("PremiereAdmin", { ...episode });
            }}
            desc={episode.desc}
            image={episode.image}
            meta1={"Community Broadcast"}
            meta2="LIVE"
          />
        ))}
      <Title style={{ marginLeft: 16 }}>Your Podcasts</Title>
      {podcasts.map((podcast, index) => (
        <PodcastCard
          title={podcast.title}
          key={index}
          image={podcast.image}
          onPress={() => {
            podcast.verified_ownership === true
              ? navigation.navigate("YourPodcast", {
                  ...podcast,
                })
              : navigation.navigate("VerifyYourPodcast");
          }}
        />
      ))}
      <Wrapper style={{ paddingBottom: 200 }}>
        <StyledButton
          primary
          style={{ marginBottom: 16 }}
          onPress={() => navigation.navigate("CreateCommunityPremiere")}
        >
          Start Community Premiere
        </StyledButton>
        <StyledButton
          onPress={() => navigation.navigate("ChooseWayOfCreatingPodcast")}
        >
          Create Official Podcast
        </StyledButton>
      </Wrapper>
    </MainContainer>
  );
}

export default YourPodcasts;