import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FetchMods } from '../actions';
import ActionButton from '../components/ActionButton';
import { MainContainer } from '../components/MainContainer';
import StyledButton from '../components/StyledButton';
import { Title } from '../components/Title';
import ToggleBar from '../components/ToggleBar';
import { Wrapper } from '../components/Wrapper';

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

const PodcastCommunity = ({ navigation, route}) => {
  const { title, id, desc, rss_url, image, mods } = route.params;
  const [toggleMode, setToggleMode] = useState('Mods');
  const [podcastMods, setPodcastMods] = useState([])

  useEffect(() => {
    const FetchData = async () => {
      const allMods = await FetchMods(mods);
      setPodcastMods(allMods);
      console.log(allMods);
    }

    FetchData();
  }, [])

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
            <Title style={{ fontSize: 16 }}>Go Back</Title>
          </ButtonContainer>
        </TopBar>
      </Wrapper>
      <ToggleBar
        items={["Mods", "Followers", "Banns"]}
        onChange={(value) => setToggleMode(value)}
        style={{ marginBottom: 32 }}
      />

      <Wrapper>
        {podcastMods.map((user, index) => <ActionButton key={index} action="Edit">{user.user_name}</ActionButton>)}
        <StyledButton primary style={{marginTop: 12}} onPress={() => navigation.navigate('AddModerator', {...route.params})}>Add Mod</StyledButton>
      </Wrapper>

    </MainContainer>
  );
};

export default PodcastCommunity;