import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentlyLiveEpisodes, GetFollowedPremieres, LoginUser } from '../actions';
import { MainContainer } from '../components/MainContainer';
import PodcastCard from '../components/PodcastCard';
import { Title } from '../components/Title';
import TopNav from '../components/TopNav';


const Home = ({ navigation }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [notFollowedLiveEpisodes, setNotFollowedLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetFollowedPremieres(user_data.followed_podcasts);
      const allEpisodes = await GetCurrentlyLiveEpisodes(user_data.followed_podcasts);
      setNotFollowedLiveEpisodes([...allEpisodes.liveEpisodes, ...allEpisodes.upcomingEpisodes])
      setUpcomingEpisodes(response.upcomingEpisodes);
      setLiveEpisodes(response.liveEpisodes);
      setPastEpisodes(response.pastEpisodes);
    }
    if(user_data !== undefined) {
      FetchData();
    }
  },[user_data])
  return (
    <MainContainer player>
      <TopNav />
      {liveEpisodes.length > 0 && (
        <Title style={{ marginLeft: 16, marginBottom: 24 }}>
          Live Premieres
        </Title>
      )}
      {liveEpisodes.length > 0 &&
        liveEpisodes.map((episode, index) => (
          <PodcastCard
            title={episode.title}
            subtitle={episode.podcast_name}
            key={index}
            desc={episode.desc}
            image={episode.image}
            meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
              episode.start_date
            ).getMonth()}-${new Date(episode.start_date).getDate()}`}
            meta2={`${new Date(episode.start_date).getHours()}:${new Date(
              episode.start_date
            ).getMinutes()}:00`}
          />
        ))}
      {upcomingEpisodes.length > 0 && (
        <Title style={{ marginLeft: 16, marginBottom: 24 }}>
          Upcoming Premieres of Followed Podcasts
        </Title>
      )}
      {upcomingEpisodes.length > 0 &&
        upcomingEpisodes.map((episode, index) => (
          <PodcastCard
            title={episode.title}
            subtitle={episode.podcast_name}
            key={index}
            desc={episode.desc}
            image={episode.image}
            meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
              episode.start_date
            ).getMonth()}-${new Date(episode.start_date).getDate()}`}
            meta2={`${new Date(episode.start_date).getHours()}:${new Date(
              episode.start_date
            ).getMinutes()}:00`}
          />
        ))}

      {pastEpisodes.length > 0 && (
        <Title style={{ marginLeft: 16, marginBottom: 24 }}>
          Catch up on missed shows
        </Title>
      )}
      {pastEpisodes.length > 0 &&
        pastEpisodes.map((episode, index) => (
          <PodcastCard
            title={episode.title}
            subtitle={episode.podcast_name}
            key={index}
            desc={episode.desc}
            image={episode.image}
            meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
              episode.start_date
            ).getMonth()}-${new Date(episode.start_date).getDate()}`}
            meta2={`${new Date(episode.start_date).getHours()}:${new Date(
              episode.start_date
            ).getMinutes()}:00`}
          />
        ))}

      {notFollowedLiveEpisodes.length > 0 && <Title style={{ marginBottom: 24, marginLeft: 16 }}>
        You might like this
      </Title>}
      {notFollowedLiveEpisodes.length > 0 &&
        notFollowedLiveEpisodes.map((episode, index) => (
          <PodcastCard
            title={episode.title}
            subtitle={episode.podcast_name}
            key={index}
            desc={episode.desc}
            image={episode.image}
            meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
              episode.start_date
            ).getMonth()}-${new Date(episode.start_date).getDate()}`}
            meta2={`${new Date(episode.start_date).getHours()}:${new Date(
              episode.start_date
            ).getMinutes()}:00`}
          />
        ))}
    </MainContainer>
  );
};

export default Home;