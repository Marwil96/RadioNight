import React, { useEffect, useState } from "react";
import colors from "../variables/color";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import PodcastDetailsHeader from "../components/PodcastDetailsHeader";
import { Title } from "../components/Title";
import {FetchPodcastFromRSS} from '../other/helperFunctions'
import TopNav from "../components/TopNav";
import { ActivityIndicator, View } from "react-native";
import StyledButton from "../components/StyledButton";
import { Wrapper } from "../components/Wrapper";
import { GetPodcastPremieres, StartFollowingPodcast, StopFollowingPodcast } from "../actions";
import { useSelector } from "react-redux";

const PodcastDetails = ({route}) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const [loading, setLoading ] = useState(false);
  const [rssEpisodes, setRssEpisodes] = useState([])
  const [episodes, setEpisodes] = useState([]);
  const [rssFeedLimit, setRssFeedLimit] = useState(20)
  const { title, rss_url, image, id, authors, desc } = route.params;

   useEffect(() => {
    const FetchData = async () => {
      if (rss_url !== undefined) {
        setLoading(true)
        const premieresData = await GetPodcastPremieres(id);
        const podcastData = await FetchPodcastFromRSS(rss_url);
        setEpisodes(premieresData)
        setRssEpisodes(podcastData.items)
        setLoading(false)
      }
    }

    FetchData()
  }, [])
  return (
    <MainContainer>
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

      {episodes.length > 0 && <Title style={{ marginLeft: 16 }}>Upcoming Episode Premieres</Title>}
      {loading ? <ActivityIndicator color={colors.primary} size="large" /> :episodes.map((episode, index) => (
        <PodcastCard
          PodcastCard
          title={episode.title}
          subtitle={episode.podcast_name}
          key={index}
          desc={episode.desc}
          image={episode.image}
        />
      )) }

      <Title style={{ marginLeft: 16 }}>From RSS Feed</Title>
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
