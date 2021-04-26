import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";

const ForgotPassword = ({ navigation }) => {
  return (
    <MainContainer noAuth>
      <Wrapper>
        <Title style={{ fontSize: 32, marginTop: 48 }}>Reset Password</Title>
        <InputField placeholder="Email" style={{ marginBottom: 16 }} />
        <StyledButton primary style={{ marginBottom: 16 }}>Send Reset Link</StyledButton>
        <StyledButton
          style={{ marginBottom: 16 }}
          onPress={() => navigation.goBack()}
        >Go Back</StyledButton>
      </Wrapper>
    </MainContainer>
  );
};

export default ForgotPassword;
