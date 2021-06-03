import React, { useEffect, useState } from "react";
import colors from "../variables/color";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import PodcastDetailsHeader from "../components/PodcastDetailsHeader";
import { Title } from "../components/Title";
import { FetchPodcastFromRSS } from "../other/helperFunctions";
import TopNav from "../components/TopNav";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import StyledButton from "../components/StyledButton";
import { Wrapper } from "../components/Wrapper";
import {
  GetFollowedPremieres,
  GetPodcastPremieres,
  StartFollowingPodcast,
  StopFollowingPodcast,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { OpenEpisodePlayer, OpenRssPlayer } from "../actions/globalActions";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Span } from "../components/Span";

const CoverArt = styled.Image`
  height: 67px;
  width: 67px;
  margin-right: 12px;
  border-radius: 4px;
`;

const TopBar = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;


const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  font-family: "Manrope_500Medium";
  color: ${colors.text};
  borderBottomColor: ${colors.text};
  borderBottomWidth: 1px;
  padding-bottom: 8px;
  flex-shrink: 1;
  display: flex;
  flex-direction: row;
  align-self: baseline;
`;

const LinkStyle = styled.TouchableOpacity`
  padding: 12px 0px;
  borderBottomColor: ${colors.text};
  borderBottomWidth: 1px;
  borderTopColor: ${colors.text};
  borderTopWidth: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const LinkText = styled.Text`
  color: ${colors.text};
  font-size: 18px;
  font-family: "Manrope_500Medium";
`;

const ReadMore = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-family: "Manrope_700Bold";
`


const EpisodeDetails = ({ route, navigation }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rssEpisodes, setRssEpisodes] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);
  const [rssFeedLimit, setRssFeedLimit] = useState(20);
  const [descLimit, setDescLimit] = useState(150);
  const { podcast, episode } = route.params;
  console.log(route.params, episode);

  useEffect(() => {

  }, []);

  return (
    <MainContainer loading={user_data?.followed_podcasts === undefined}>
      <Wrapper style={{ marginBottom: 16 }}>
        <TopBar>
          <ButtonContainer onPress={() => navigation.goBack()}>
            <AntDesign
              style={{ marginRight: 12 }}
              name="back"
              size={24}
              color="white"
            />
            <Title style={{ fontSize: 16 }}>Go back</Title>
          </ButtonContainer>
        </TopBar>
      </Wrapper>
      <Wrapper>
        <CoverArt
          style={{ marginBottom: 24 }}
          source={{
            uri:
              episode.itunes.image !== undefined
                ? episode.itunes.image
                : podcast.image,
          }}
        />
        <Title style={{ fontSize: 32, marginBottom: 12, lineHeight: 38 }}>
          {episode.title}
        </Title>
        <TouchableOpacity style={{marginBottom: 24}} onPress={() =>navigation.navigate("PodcastDetails", {...podcast,})}>
          <Subtitle>
            {podcast.title}
          </Subtitle>
        </TouchableOpacity>
        <StyledButton style={{paddingBottom: 12, paddingTop: 12, marginBottom: 24 ,flexShrink: 1, display: "flex", flexDirection: "row",alignSelf: "baseline"}} primary 
          onPress={() => 
            dispatch(
              OpenRssPlayer({
                data: {
                  episode: { ...episode },
                  podcast: { ...podcast },
                },
                state: true,
              }))}>
             Play Episode
          </StyledButton>
          <Span style={{marginBottom: 8, fontSize: 18, fontFamily: 'Manrope_500Medium'}}>Episode Description</Span>
          <Span style={{opacity: 1}}> {podcast.desc.slice(0, descLimit)}{descLimit < 151 && podcast.desc.length > 150 && '...'}  { podcast.desc.length > 150 ? descLimit < 151 ? <ReadMore onPress={() => setDescLimit(10000)}>Read More</ReadMore> :  <ReadMore onPress={() => setDescLimit(150)}>Read Less</ReadMore> : '' }</Span>
          <LinkStyle onPress={() =>navigation.navigate("PodcastDetails", {...podcast,})}><LinkText>See All Episodes </LinkText><LinkText>-></LinkText></LinkStyle>
      </Wrapper>
      {/* <PodcastDetailsHeader
        bgColor={colors.background}
        textColor={colors.text}
        title={title}
        categories={categories}
        image={image}
        isFollowed={user_data?.followed_podcasts.includes(id)}
        // subtitle="Business & Comedy"
        // onButtonPress={(isFollowed) => {
        //   if (isFollowed) {
        //     StartFollowingPodcast(id);
        //   } else {
        //     StopFollowingPodcast(id);
        //   }
        // }}
        desc={desc}
      /> */}

      <View style={{ paddingBottom: 200 }}></View>
    </MainContainer>
  );
};

export default EpisodeDetails;
