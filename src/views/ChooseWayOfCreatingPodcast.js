import React from 'react';
import styled from "styled-components/native";
import ActionButton from '../components/ActionButton';
import { MainContainer } from '../components/MainContainer';
import { Title } from '../components/Title';
import TopNav from '../components/TopNav';
import { Wrapper } from '../components/Wrapper';

const ChooseWayOfCreatingPodcast = ({navigation}) => {
  return (
    <MainContainer>
      <TopNav />
      <Wrapper>
        <Title>Create Podcast</Title>
        <ActionButton onPress={() => navigation.navigate('CreatePodcastWithRSS')} primary>With RSS</ActionButton>
        {/* <ActionButton>With MP3/Audio files</ActionButton> */}
      </Wrapper>
    </MainContainer>
  );
}

export default ChooseWayOfCreatingPodcast;