import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { UpdatePodcastDetails, UpdateUserData } from "../actions";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import ProfileImageUpload from "../components/ProfileImageUpload";
import { Span } from "../components/Span";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";

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

const EditUser = ({ navigation, route }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(user_data.user_name);
  const [userBio, setUserBio] = useState(user_data.bio);
  const [userImage, setUserImage] = useState(user_data.user_image);

  const UpdateUserDetails = async () => {
    setLoading(true);
    const response = await UpdateUserData({data: {user_image: userImage, bio: userBio, user_name: userName }});
    console.log(response);
    setLoading(false);

    if (response) {
      navigation.goBack();
    }
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
      <Title style={{ marginLeft: 16, fontSize: 24 }}>Settings</Title>
      <Wrapper>
        <ProfileImageUpload setImage={(image) => setUserImage(image)} userImage={userImage}/>
      </Wrapper>
      <Wrapper style={{ marginBottom: 24 }}>
        <Span style={{ fontSize: 20, marginBottom: 12 }}>Username</Span>
        <InputField
          placeholder="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
      </Wrapper>
      <Wrapper style={{ marginBottom: 24 }}>
        <Span style={{ fontSize: 20, marginBottom: 12 }}>Your Bio</Span>
        <InputField
          placeholder={`The economy explained. Imagine you could call up a friend and say, "Meet me at the bar and tell me what's going on with the economy." Now imagine that's actually a fun evening.`}
          multiline={true}
          value={userBio}
          onChangeText={(text) => setUserBio(text)}
        />
      </Wrapper>

      <Wrapper style={{ marginBottom: 32, paddingBottom: 200 }}>
        <StyledButton
          onPress={() => UpdateUserDetails()}
          primary={userName !== undefined ? true : false}
        >
          Update Userdetails
        </StyledButton>
      </Wrapper>

      <Wrapper style={{ marginBottom: 24, paddingBottom: 200 }}></Wrapper>
    </MainContainer>
  );
};

export default EditUser;
