import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { FetchYourPodcasts } from '../actions';
import { MainContainer } from '../components/MainContainer';
import PodcastCard from '../components/PodcastCard';
import { Title } from '../components/Title';

const YourPodcasts = ({navigation}) => {
  const [podcasts, setPodcasts] = useState([]);
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  useEffect(() => {
    if(user_data !== undefined) {
      const FetchData = async () => {
        const podcastsData = await FetchYourPodcasts(user_data.owned_podcasts);
        setPodcasts(podcastsData);
      };

      FetchData();
    }
  }, [user_data])
  
  return (
    <MainContainer>
      <Title style={{ marginLeft: 16 }}>Your Podcasts</Title>
      {podcasts.map((podcast) => (
        <PodcastCard title={podcast.title} image={podcast.image} onPress={() => navigation.navigate('YourPodcast',{
           ...podcast
          })} />
      ))}
    </MainContainer>
  );
}

export default YourPodcasts;