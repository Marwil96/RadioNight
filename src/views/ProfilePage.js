import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { FetchUserData, FetchYourPodcasts } from "../actions";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import { Span } from "../components/Span";
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

const ProfileContainer = styled.View`
  padding: 12px 16px;
  margin: 0 16px;
  background-color: ${colors.secondary};
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  /* justify-content: space-between; */
  margin-bottom: 12px;
`;

const ProfileImage = styled.Image`
  width: 69px;
  height: 69px;
  border-radius: 1000px;
  margin-right: 16px;
`;

const ProfilePage = ({ navigation, route }) => {
  // const { user_data } = useSelector((state) => state.DatabaseReducer);
  const {user_id} = route.params;
  const [userData, setUserData] = useState(false)
  const [loading, setLoading] = useState(false);
  const [followedPodcasts, setFollowedPodcasts] = useState([]);
  const [ownedPodcasts, setOwnedPodcasts] = useState([]);

   useEffect(() => {
     const FetchData = async () => {
       setLoading(true)

       const userData = await FetchUserData(user_id);
       const followedPodcasts = await FetchYourPodcasts(userData.followed_podcasts);
       const ownedPodcasts = await FetchYourPodcasts(userData.owned_podcasts);

       setFollowedPodcasts(followedPodcasts)
       setOwnedPodcasts(ownedPodcasts);
       setUserData(userData)

       setLoading(false);
     };

     FetchData();
   }, []);


  return (
    <MainContainer loading={loading}>
      <Wrapper style={{ marginBottom: 8 }}>
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

      {userData !== false && (
        <ProfileContainer style={{ marginBottom: 24 }}>
          <Header>
            <Title style={{ fontSize: 22, marginBottom: 0 }}>
              {userData.user_name}
            </Title>
            {userData.user_image && <ProfileImage
              source={{
                uri: userData.user_image,
              }}
            />}
          </Header>
          <Span>{userData.bio}</Span>
        </ProfileContainer>
      )}

      {ownedPodcasts.length > 0 && <View style={{ marginBottom: 24, marginLeft: 0 }}>
        <Title style={{marginLeft: 16}}>Owned Podcasts</Title>
        <View horizontal={true}>
          {ownedPodcasts.map((podcast, index) => (
             <PodcastCard
              //  style={{ width: 300, paddingRight: 0, marginLeft: 0 }}
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
      </View>}

      {followedPodcasts.length > 0 && <View style={{ marginBottom: 24, paddingBottom: 200, marginLeft: 0 }}>
        <Title style={{marginLeft: 16}}>Followed Podcasts</Title>
        <ScrollView horizontal={true}>
          {followedPodcasts.map((podcast, index) => (
             <PodcastCard
               style={{ width: 300, paddingRight: 0, marginLeft: 0 }}
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
        </ScrollView>
      </View>}
    </MainContainer>
  );
};

export default ProfilePage;
