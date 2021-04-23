import React from 'react';
import colors from "../variables/color";
import { AntDesign } from '@expo/vector-icons'; 
import styled from "styled-components/native";
import { MainContainer } from '../components/MainContainer';
import { Title } from '../components/Title';
import MiniPlayer from '../components/MiniPlayer';
import PodcastDetailsHeader from '../components/PodcastDetailsHeader';
import { Wrapper } from '../components/Wrapper';

const TopBar = styled.View`
  width: 100%;
`

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`

const EpisodeView = () => {
  return (
    <MainContainer>
      <Wrapper>
        <TopBar>
          <ButtonContainer>
            <AntDesign style={{marginRight: 12}} name="back" size={24} color="white" />
            <Title style={{fontSize: 16}}>Go Back</Title>
          </ButtonContainer>
        </TopBar>
      </Wrapper>
      <MiniPlayer 
        style={{position: 'relative', background: '#000000', backgroundColor: colors.background, paddingLeft: 0, paddingRight: 0,}}  
        title="Welcome to Jurassic Ar..."
        subtitle="99% Invisible"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTy7v2Vrnp5LhNS7JoKB12kyK9_gxyCjbGFdDf7MkMmXEfvo8XY"/>
      <PodcastDetailsHeader
        bgColor={colors.text}
        style={{paddingTop: 16, paddingBottom: 16}}
        textColor={'#000'}
        title="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        subtitle="Business & Comedy"
        desc={`The economy explained. Imagine you could call up a friend and say, "Meet me at the bar and tell me what's going on with the economy." Now imagine that's actually a fun evening.`}
      />
    </MainContainer>
  )
}

export default EpisodeView;