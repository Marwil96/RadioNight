import React, { useEffect, useState } from "react";
import colors from "../variables/color";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import PodcastDetailsHeader from "../components/PodcastDetailsHeader";
import { Title } from "../components/Title";
import {FetchPodcastFromRSS} from '../other/helperFunctions'
import TopNav from "../components/TopNav";
import { ActivityIndicator, ScrollView, View } from "react-native";
import StyledButton from "../components/StyledButton";
import { Wrapper } from "../components/Wrapper";
import { GetFollowedPremieres, GetPodcastPremieres, StartFollowingPodcast, StopFollowingPodcast } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { OpenEpisodePlayer, OpenRssPlayer } from "../actions/globalActions";

const PodcastDetails = ({ route, navigation }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rssEpisodes, setRssEpisodes] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);
  const [rssFeedLimit, setRssFeedLimit] = useState(20);
  const { title, rss_url, image, id, authors, desc } = route.params;
  

  useEffect(() => {
    const FetchData = async () => {
      if (rss_url !== undefined) {
        setLoading(true);
        const premieresData = await GetFollowedPremieres([id]);
        const podcastData = await FetchPodcastFromRSS(rss_url);
        setUpcomingEpisodes(premieresData.upcomingEpisodes);
        setLiveEpisodes(premieresData.liveEpisodes);
        setPastEpisodes(premieresData.pastEpisodes);
        setRssEpisodes(podcastData.items);
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  return (
    <MainContainer loading={user_data?.followed_podcasts === undefined}>
      <TopNav />
      <PodcastDetailsHeader
        bgColor={colors.background}
        textColor={colors.text}
        title={title}
        image={image}
        isFollowed={user_data?.followed_podcasts.includes(id)}
        // subtitle="Business & Comedy"
        onButtonPress={(isFollowed) => {
          if (isFollowed) {
            StartFollowingPodcast(id);
          } else {
            StopFollowingPodcast(id);
          }
        }}
        desc={desc}
      />

      {liveEpisodes.length > 0 && (
        <Title
          style={{
            marginLeft: 16,
            fontSize: 20,
            fontFamily: "Manrope_400Regular",
          }}
        >
          Live Episodes
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
            onPress={() => {
              dispatch(
                OpenEpisodePlayer({ data: { ...episode }, state: true })
              );
            }}
            meta1={episode.official ? 'Official Broadcast' : 'Community Broadcast'}
            meta2={"LIVE"}
          />
        ))}
      {upcomingEpisodes.length > 0 && (
        <Title
          style={{
            marginLeft: 16,
            fontSize: 20,
            fontFamily: "Manrope_400Regular",
          }}
        >
          {" "}
          Scheduled Episodes
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
        <Title
          style={{
            marginLeft: 16,
            fontSize: 20,
            fontFamily: "Manrope_400Regular",
          }}
        >
          Past Premieres
        </Title>
      )}
      <ScrollView horizontal={true}>
        {pastEpisodes.length > 0 &&
          pastEpisodes.map((episode, index) => (
            <PodcastCard
              title={episode.title}
              subtitle={episode.podcast_name}
              style={{ width: 300, paddingRight: 0, marginLeft: 0 }}
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
      </ScrollView>

      <Title style={{ marginLeft: 16, marginTop: 24 }}>From RSS Feed</Title>
      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        rssEpisodes.map((episode, index) => {
          if (index < rssFeedLimit) {
            return (
              <PodcastCard
                title={episode.title}
                subtitle={title}
                key={index}
                // onPress={() => navigation.navigate('RssPlayer', {episode: {...episode}, podcast: {...route.params}, mode:'rss'})}
                onPress={() =>
                  dispatch(
                    OpenRssPlayer({
                      data: {
                        episode: { ...episode },
                        podcast: { ...route.params },
                      },
                      state: true,
                    })
                  )
                }
                desc={
                  episode.itunes.summary !== undefined && episode.itunes.summary
                }
                image={
                  episode.itunes.image !== undefined
                    ? episode.itunes.image
                    : image
                }
              />
            );
          }
        })
      )}
      {!loading &&
        rssFeedLimit !== rssEpisodes.length &&
        rssFeedLimit < rssEpisodes.length && (
          <Wrapper>
            <StyledButton
              primary
              onPress={() => setRssFeedLimit(rssFeedLimit + 20)}
            >
              See older Episodes
            </StyledButton>
          </Wrapper>
        )}
      <View style={{ paddingBottom: 200 }}></View>
    </MainContainer>
  );
};

export default PodcastDetails;
