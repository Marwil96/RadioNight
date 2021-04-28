import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { FetchYourPodcasts } from "../actions";
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
  const { title } = route.params;

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
      {allPodcastPremieres.length === 0 && <Title  style={{ marginLeft: 16, fontSize: 20, fontFamily: 'Manrope_400Regular' }}>Empty... You Haven't relased a Episode Premiere yet.</Title>}
      <Wrapper>
        <StyledButton primary onPress={() => navigation.navigate("CreatePodcastPremiere", {...route.params})}> Schedule Podcast Premiere </StyledButton>
      </Wrapper>
    </MainContainer>
  );
};

export default YourPodcast;
