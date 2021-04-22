import React from "react";
import { Text, View } from "react-native";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import { Title } from "../components/Title";
import ToggleBar from "../components/ToggleBar";
import TopNav from "../components/TopNav";

const Following = () => {
  return (
    <MainContainer>
      <TopNav />
      <Title style={{ marginBottom: 24 }}>Premieres</Title>
      <ToggleBar items={['Live', 'Upcoming', 'Past']} />
    </MainContainer>
  );
};

export default Following;
