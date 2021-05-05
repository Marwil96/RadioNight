import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { FetchYourPodcasts, GetPodcastPremieres } from "../actions";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";
import colors from "../variables/color";

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


const YourPodcast = ({ navigation, route }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [allPodcastPremieres, setAllPodcastPremieres] = useState([]);
  const [upcomingEpisodes, setUpcomingEpisodes] = useState([]);
  const [liveEpisodes, setLiveEpisodes] = useState([]);
  const [pastEpisodes, setPastEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { title, id } = route.params;

  
   useEffect(() => {
     const FetchData = async () => {
      setLoading(true);
      const premieresData = await GetPodcastPremieres(id);
      console.log(premieresData)
      setUpcomingEpisodes(premieresData.upcomingEpisodes);
      setLiveEpisodes(premieresData.liveEpisodes);
      setPastEpisodes(premieresData.pastEpisodes);
      setLoading(false);
     };

     FetchData();
   }, []);

  return (
    <MainContainer>
      <Wrapper>
        <TopBar>
          <ButtonContainer onPress={() => navigation.goBack()}>
            <AntDesign
              style={{ marginRight: 12 }}
              name="back"
              size={24}
              color="white"
            />
            <Title style={{ fontSize: 16 }}>See all Podcasts</Title>
          </ButtonContainer>
          <Link style={{ fontSize: 16, color: colors.text }}>Settings</Link>
        </TopBar>
      </Wrapper>
      <Title style={{ marginLeft: 16 }}>{title}</Title>
      {liveEpisodes.length > 0 && <Title  style={{ marginLeft: 16, fontSize: 20, fontFamily: 'Manrope_400Regular' }}>Live Episodes</Title>}
      {liveEpisodes.length > 0 && liveEpisodes.map((episode, index) => 
        <PodcastCard 
          title={episode.title}
          subtitle={episode.podcast_name}
          key={index}
          desc={episode.desc}
          image={episode.image} 
          meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(episode.start_date).getMonth()}-${new Date(episode.start_date).getDate()}`}
          meta2={`${new Date(episode.start_date).getHours()}:${new Date(episode.start_date).getMinutes()}:00`}
        />)
      }
      <Title  style={{ marginLeft: 16, fontSize: 20, fontFamily: 'Manrope_400Regular' }}>{upcomingEpisodes.length === 0 ? "Empty... You Haven't Scheduled a Episode Premiere yet." : "Scheduled Episodes"}</Title>
      {upcomingEpisodes.length > 0 && upcomingEpisodes.map((episode, index) => 
        <PodcastCard 
          title={episode.title}
          subtitle={episode.podcast_name}
          key={index}
          desc={episode.desc}
          image={episode.image} 
          meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(episode.start_date).getMonth()}-${new Date(episode.start_date).getDate()}`}
          meta2={`${new Date(episode.start_date).getHours()}:${new Date(episode.start_date).getMinutes()}:00`}
        />)
      }

      {pastEpisodes.length > 0 && <Title  style={{ marginLeft: 16, fontSize: 20, fontFamily: 'Manrope_400Regular' }}>Live Episodes</Title>}
      {pastEpisodes.length > 0 && pastEpisodes.map((episode, index) => 
        <PodcastCard 
          title={episode.title}
          subtitle={episode.podcast_name}
          key={index}
          desc={episode.desc}
          image={episode.image} 
          meta1={`${new Date(episode.start_date).getFullYear()}-${new Date(episode.start_date).getMonth()}-${new Date(episode.start_date).getDate()}`}
          meta2={`${new Date(episode.start_date).getHours()}:${new Date(episode.start_date).getMinutes()}:00`}
        />)
      }
      
      <Wrapper>
        <StyledButton primary onPress={() => navigation.navigate("CreatePodcastPremiere", {...route.params})}> Schedule Podcast Premiere </StyledButton>
      </Wrapper>
    </MainContainer>
  );
};

export default YourPodcast;