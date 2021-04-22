import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import ProfileImageUpload from "../components/ProfileImageUpload";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";

const SetupProfile = ({ navigation }) => {
  return (
    <MainContainer>
      <Title style={{ fontSize: 32, marginTop: 48 }}>Profile Settings</Title>
      <ProfileImageUpload style={{marginBottom: 32}} />
      <Title style={{fontSize: 20, marginBottom: 12}}>Write something about you</Title>
      <InputField placeholder="Bio" style={{ marginBottom: 16 }} />
      <StyledButton primary style={{ marginBottom: 16 }}>
        Send Reset Link
      </StyledButton>
      <StyledButton
        style={{ marginBottom: 16 }}
        onPress={() => navigation.goBack()}
      >
        Go Back
      </StyledButton>
    </MainContainer>
  );
};

export default SetupProfile;
