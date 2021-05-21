import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { FetchAllFollowers, FetchBannedUsers, FetchMods, RemoveAsMod, RemoveUserFromBanList } from '../actions';
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
    const { user_data } = useSelector((state) => state.DatabaseReducer);
  const { title, id, desc, rss_url, image, mods, banned_users, officialBroadcast } = route.params;
  const [toggleMode, setToggleMode] = useState('Mods');
  const [podcastMods, setPodcastMods] = useState([])
  const [allFollowers, setAllFollowers] = useState([]);
  const [allBannedUsers, setAllBannedUsers] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const allMods = await FetchMods(mods);
      setPodcastMods(allMods);

      if(officialBroadcast) {
        const allFollowers = await FetchAllFollowers(id);
        setAllFollowers(allFollowers);
      }

      const bannedUsers = await FetchBannedUsers(banned_users);
      setAllBannedUsers(bannedUsers);
      console.log(allMods, allFollowers);
    }

    FetchData();
  }, [])

  const FetchBannedUsersHelper = async (userId) => {
     const bannedUsers = allBannedUsers.filter((item) => item === userId);
     setAllBannedUsers(bannedUsers);
  }

  
  const FetchModHelper = async (userId) => {
     const allMods = podcastMods.filter((item) => item === userId);
     setPodcastMods(allMods);
  }

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
        items={officialBroadcast ? ["Mods", "Followers", "Banns"] : ["Mods", "Banns"]}
        onChange={(value) => setToggleMode(value)}
        style={{ marginBottom: 32 }}
      />

     {toggleMode === 'Mods' && <Wrapper>
        {podcastMods.map((user, index) => <ActionButton key={index} action="Remove as Moderator" onPress={async () =>{RemoveAsMod({collection: officialBroadcast ? "podcasts" : "users", user_id: user.user_id, podcast_id: officialBroadcast ? id : user_data.user_id }); FetchModHelper(user.user_id);}}>{user.user_name}</ActionButton>)}
        <StyledButton primary style={{marginTop: 12}} onPress={() => navigation.navigate('AddModerator', {...route.params})}>Add Mod</StyledButton>
      </Wrapper>}

      {toggleMode === 'Followers' && <Wrapper>
        {allFollowers.map((user, index) => <ActionButton key={index} onPress={() => navigation.navigate('ProfilePage', {...user})} action="Check out Profile">{user.user_name}</ActionButton>)}
      </Wrapper>}

       {toggleMode === 'Banns' && <Wrapper>
        {allBannedUsers.map((user, index) => <ActionButton key={index} action="Remove Ban" onPress={async () =>{RemoveUserFromBanList({collection: officialBroadcast ? "podcasts" : "users", user_id: user.user_id, podcast_id: officialBroadcast ? id : user_data.user_id }); FetchBannedUsersHelper(user.user_id);}}>{user.user_name}</ActionButton>)}
      </Wrapper>}

    </MainContainer>
  );
};

export default PodcastCommunity;