import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { FetchYourPodcasts, GetFollowedPremieres } from "../actions";
import { OpenEpisodePlayer, OpenRssPlayer } from "../actions/globalActions";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import { Title } from "../components/Title";
import ToggleBar from "../components/ToggleBar";
import TopNav from "../components/TopNav";
import colors from "../variables/color";

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 0 16px;
  margin-bottom: 24px;
`;

const DisplayModeTitle = styled.Text`
  font-size: ${props => props.active ?  '24px' : '24px'};
  font-family: ${props => props.active ? "Manrope_500Medium" : "Manrope_400Regular"};
  margin-right: 16px;
  color: ${props => props.active ? colors.text : colors.unFocused};
`;

const Following = ({navigation}) => {
   const { user_data } = useSelector((state) => state.DatabaseReducer);
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [podcasts, setPodcasts] = useState([]);
  const [displayMode, setDisplayMode] = useState("episodes");
  const [toggleMode, setToggleMode] = useState('Live')
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);

  const FetchData = async () => {
    setLoading(true)
    const response = await GetFollowedPremieres(user_data.followed_podcasts);
    setUpcomingEpisodes(response.upcomingEpisodes);
    setLiveEpisodes(response.liveEpisodes);
    setPastEpisodes(response.pastEpisodes);
    const podcastsData = await FetchYourPodcasts(user_data?.followed_podcasts);
    setPodcasts(podcastsData);
    setLoading(false);
  }
  useEffect(() => {
    if(user_data !== undefined) {
      FetchData();
    }
  },[user_data])

  return (
    <MainContainer loading={loading} >
      <TopNav onRefresh={() => FetchData()}/>
      <TitleWrapper>
        <DisplayModeTitle
          onPress={() => setDisplayMode("episodes")}
          active={displayMode === "episodes"}
        >
          Premieres
        </DisplayModeTitle>
        <DisplayModeTitle
          onPress={() => setDisplayMode("shows")}
          active={displayMode === "shows"}
        >
          Shows
        </DisplayModeTitle>
      </TitleWrapper>
      {displayMode === "episodes" ? (
        <View>
        <ToggleBar
          items={["Live", "Upcoming", "Past"]}
          onChange={(value) => setToggleMode(value)}
          style={{marginBottom :24}}
        />
        {toggleMode === 'Live' &&
          <View>
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
                meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
                  episode.start_date
                ).getMonth()}-${new Date(episode.start_date).getDate()}`}
                meta2={episode.episode_is_running ? "LIVE" : "PREPARTY"}
              />
            ))}
          </View>
          }
          {toggleMode === 'Upcoming' && 
            <View>
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
            </View>
          }
          {toggleMode === 'Past' && 
          <View>
            {pastEpisodes.length > 0 &&
              pastEpisodes.map((episode, index) => (
              <PodcastCard
                title={episode.title}
                subtitle={episode.podcast_name}
                key={index}
                desc={episode.desc}
                onPress={() => dispatch(OpenRssPlayer({data: {episode: {title: episode.title, itunes: {image: episode.image}, enclosures:[{url: episode.play_link}]}, podcast: {title: episode.podcast_name, image: episode.image}}, state: true}))}
                image={episode.image}
                meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(
                  episode.start_date
                ).getMonth()}-${new Date(episode.start_date).getDate()}`}
                meta2={`${new Date(episode.start_date).getHours()}:${new Date(
                  episode.start_date
                ).getMinutes()}:00`}
              />
            ))}
          </View>
          }
        </View>
      ) : (
        <View>
          {podcasts.map((podcast, index) => (
            <PodcastCard
              title={podcast.title}
              image={podcast.image}
              key={index}
              onPress={() =>
                navigation.navigate("PodcastDetails", {
                  ...podcast,
                })
              }
            />
          ))}
        </View>
      )}
    </MainContainer>
  );
};

export default Following;
