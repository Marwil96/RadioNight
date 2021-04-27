import React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import { Title } from "../components/Title";
import ToggleBar from "../components/ToggleBar";
import TopNav from "../components/TopNav";

const Following = () => {
  const [toggleMode, setToggleMode] = useState('live')
  return (
    <MainContainer>
      <TopNav />
      <Title style={{ marginLeft: 16, marginBottom: 24 }}>Premieres</Title>
      <ToggleBar
        items={["Live", "Upcoming", "Past"]}
        onChange={(value) => setToggleMode(value)}
      />
    </MainContainer>
  );
};

export default Following;
