import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { UpdatePodcastDetails } from "../actions";
import ActionButton from "../components/ActionButton";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import { Span } from "../components/Span";
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

const ProfileContainer = styled.View`
  padding: 12px 16px;
  margin: 0 16px;
  background-color: ${colors.secondary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`

const ProfileImage = styled.Image`
  width: 69px;
  height: 69px;
  border-radius: 1000px;
`

const UserSettings = ({ navigation, route }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const [loading, setLoading] = useState(false);
  const [podcastTitle, setPodcastTitle] = useState();
  const [podcastDesc, setPodcastDesc] = useState();
  const [removePodcastCheck, setRemovePodcastCheck] = useState("");

  const UpdateSettings = async () => {
    setLoading(true);
    // const response = dadadad
    setLoading(false);

    // if (response) {
    //   navigation.goBack();
    // }
  };

  return (
    <MainContainer loading={loading}>
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
      <Title style={{ marginLeft: 16, fontSize: 24 }}>Account</Title>

      <ProfileContainer style={{ marginBottom: 24 }}>
        <Title style={{ fontSize: 20, marginBottom: 0 }}>
          {user_data.user_name}
        </Title>
        <ProfileImage
          source={{
            uri: user_data.user_image,
          }}
        />
      </ProfileContainer>

      <Wrapper>
        <ActionButton action="Open">Settings</ActionButton>
        <ActionButton action="Edit" onPress={() => navigation.navigate("EditUser")}>Edit Profile</ActionButton>
        <ActionButton action="Change">Change Email</ActionButton>
        <ActionButton action="Change">Change Password</ActionButton>
        <ActionButton action="Delete" borderMode={true} style={{backgroundColor: colors.background}}>Delete Account</ActionButton>
      </Wrapper>
      <Wrapper style={{ marginBottom: 24, paddingBottom: 200 }}>
        {/* <Span style={{ fontSize: 20, marginBottom: 12 }}>
          Fill in the pocast name to remove podcast.
        </Span>
        <InputField
          style={{ marginBottom: 24 }}
          placeholder="Podcast Name"
          value={removePodcastCheck}
          onChangeText={(text) => setRemovePodcastCheck(text)}
        />
        <StyledButton
        // onPress={() => StartEpisodePremiere()}
         primary={removePodcastCheck === title ? true : false}
        >
          Remove Podcast
        </StyledButton> */}
      </Wrapper>
    </MainContainer>
  );
};

export default UserSettings;
