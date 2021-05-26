import React, { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { UpdateUserData } from "../actions";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import ProfileImageUpload from "../components/ProfileImageUpload";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";

const SetupProfile = ({ navigation }) => {
  const [userBio, setUserBio] = useState('');
  const [userImage, setUserImage] = useState(false);

  const UpdateUserDetails = async () => {
    setLoading(true);
    const response = await UpdateUserData({data: {user_image: userImage, bio: userBio !== undefined ? userBio : 'This is my profile!', user_name: userName }});
    console.log(response);
    setLoading(false);

    if (response) {
      navigation.navigate("Home");
    }
  };

  return (
    <MainContainer>
      <Wrapper>
        <Title style={{ fontSize: 32, marginTop: 48 }}>Profile Settings</Title>
        <ProfileImageUpload style={{ marginBottom: 32 }} setImage={(image) => setUserImage(image)} userImage={undefined} />
        <Title style={{ fontSize: 20, marginBottom: 12 }}>
          Write something about you
        </Title>
        <InputField placeholder="Bio" style={{ marginBottom: 16 }} onChangeText={(text) => setUserBio(text)} />
        <StyledButton
          primary
          onPress={() => UpdateUserDetails()}
          style={{ marginBottom: 16 }}
        >
          Save Profile!
        </StyledButton>
      </Wrapper>
    </MainContainer>
  );
};

export default SetupProfile;
