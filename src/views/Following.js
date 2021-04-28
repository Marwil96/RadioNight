import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { FetchYourPodcasts } from "../actions";
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
   const [podcasts, setPodcasts] = useState([]);
  const [displayMode, setDisplayMode] = useState("episodes");
  const [toggleMode, setToggleMode] = useState('live')

  useEffect(() => {
    if(user_data !== undefined) {
      const FetchData = async () => {
        const podcastsData = await FetchYourPodcasts(user_data?.followed_podcasts);
        setPodcasts(podcastsData);
      };

      FetchData();
    }
  }, [user_data])

  return (
    <MainContainer>
      <TopNav />
      <TitleWrapper>
        <DisplayModeTitle
          onPress={() => setDisplayMode("episodes")}
          active={displayMode === "episodes"}
        >
          Episodes
        </DisplayModeTitle>
        <DisplayModeTitle
          onPress={() => setDisplayMode("shows")}
          active={displayMode === "shows"}
        >
          Shows
        </DisplayModeTitle>
      </TitleWrapper>
      {displayMode === "episodes" ? (
        <ToggleBar
          items={["Live", "Upcoming", "Past"]}
          onChange={(value) => setToggleMode(value)}
        />
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
