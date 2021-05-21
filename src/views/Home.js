import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AcceptInvitationToMod, DeclineInvitationToMod, GetCurrentlyLiveEpisodes, GetFollowedPremieres, LoginUser } from '../actions';
import { OpenEpisodePlayer, OpenRssPlayer } from '../actions/globalActions';
import InviteCard from '../components/InviteCard';
import { MainContainer } from '../components/MainContainer';
import PodcastCard from '../components/PodcastCard';
import { Title } from '../components/Title';
import TopNav from '../components/TopNav';
import { Wrapper } from '../components/Wrapper';
import { pauseStreamNotification } from '../other/notificationFunctions';

const Home = ({ navigation }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch()
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [notFollowedLiveEpisodes, setNotFollowedLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);
  const [loading, setLoading ] = useState(false);

  const FetchData = async () => {
    setLoading(true)
    const response = await GetFollowedPremieres(user_data.followed_podcasts);
    const allEpisodes = await GetCurrentlyLiveEpisodes(user_data.followed_podcasts);
    setNotFollowedLiveEpisodes([...allEpisodes.liveEpisodes, ...allEpisodes.upcomingEpisodes])
    setUpcomingEpisodes(response.upcomingEpisodes);
    setLiveEpisodes(response.liveEpisodes);
    setPastEpisodes(response.pastEpisodes);
    setLoading(false);
  }
  useEffect(() => {
    if(user_data !== undefined) {
      FetchData();
    }
  },[user_data])
  
  return (
    <MainContainer player loading={loading}>
      <TopNav onRefresh={() => FetchData()} />
      {user_data !== undefined && user_data?.invited_to_mod.length > 0 && (
        <View>
          <Title style={{ marginLeft: 16, marginBottom: 24 }}>
            Invitations to moderate
          </Title>

          <ScrollView horizontal={true}>
            {user_data !== undefined
              ? user_data?.invited_to_mod.map(
                  ({ podcast_title, podcast_id, official_broadcast }, index) => (
                    <InviteCard
                      key={index}
                      title={official_broadcast ? `Start Moderating ${podcast_title}` : `Start Moderating ${podcast_title} personal broadcast.`  }
                      style={{ width: 300, paddingRight: 0, marginLeft: 0 }}
                      accept={() =>
                        AcceptInvitationToMod({official_broadcast, collection: official_broadcast ? "podcasts" : "users", podcast_title, podcast_id })
                      }
                      decline={() =>
                        DeclineInvitationToMod({official_broadcast, collection: official_broadcast ? "podcasts" : "users", podcast_title, podcast_id })
                      }
                    />
                  )
                )
              : ""}
          </ScrollView>
        </View>
      )}
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
            onPress={() => {
              dispatch(
                OpenEpisodePlayer({ data: { ...episode }, state: true })
              );
            }}
            desc={episode.desc}
            image={episode.image}
            meta1={
              episode?.official === true
                ? "Official Broadcast"
                : "Community Broadcast"
            }
            meta2={episode.episode_is_running ? "LIVE" : "PREPARTY"}
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
      <ScrollView horizontal={true}>
        {pastEpisodes.length > 0 &&
          pastEpisodes.map((episode, index) => (
            <PodcastCard
              title={episode.title}
              style={{ width: 300, paddingRight: 0, marginLeft: 0 }}
              subtitle={episode.podcast_name}
              key={index}
              desc={episode.desc}
              onPress={() =>
                dispatch(
                  OpenRssPlayer({
                    data: {
                      episode: {
                        title: episode.title,
                        itunes: { image: episode.image },
                        enclosures: [{ url: episode.play_link }],
                      },
                      podcast: {
                        title: episode.podcast_name,
                        image: episode.image,
                      },
                    },
                    state: true,
                  })
                )
              }
              image={episode.image}
              meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
                episode.start_date
              ).getMonth()}-${new Date(episode.start_date).getDate()}`}
              meta2={`${new Date(episode.start_date).getHours()}:${new Date(
                episode.start_date
              ).getMinutes()}:00`}
            />
          ))}
      </ScrollView>

      {notFollowedLiveEpisodes.length > 0 && (
        <Title style={{ marginBottom: 24, marginLeft: 16 }}>
          You might like this
        </Title>
      )}
      {notFollowedLiveEpisodes.length > 0 &&
        notFollowedLiveEpisodes.map((episode, index) => (
          <PodcastCard
            title={episode.title}
            subtitle={episode.podcast_name}
            key={index}
            desc={episode.desc}
            image={episode.image}
            onPress={() => {
              dispatch(
                OpenEpisodePlayer({ data: { ...episode }, state: true })
              );
            }}
            meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
              episode.start_date
            ).getMonth()}-${new Date(episode.start_date).getDate()}`}
            meta2={"LIVE"}
          />
        ))}
    </MainContainer>
  );
};

export default Home;