import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";

const ForgotPassword = ({ navigation }) => {
  return (
    <MainContainer>
      <Title style={{ fontSize: 32, marginTop: 48 }}>Reset Password</Title>
      <InputField placeholder="Email" style={{ marginBottom: 16 }} />
      <StyledButton primary style={{ marginBottom: 16 }}>Send Reset Link</StyledButton>
      <StyledButton
        style={{ marginBottom: 16 }}
        onPress={() => navigation.goBack()}
      >Go Back</StyledButton>
    </MainContainer>
  );
};

export default ForgotPassword;
