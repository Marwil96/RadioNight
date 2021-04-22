import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";

const HelperText = styled.Text`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: #fff;
  text-align: center;
`;

const Signup = ({navigation}) => {
  return (
    <MainContainer>
      <Title style={{ fontSize: 32, marginTop: 48 }}>Create Account</Title>
      <InputField placeholder="Username" style={{ marginBottom: 16 }} />
      <InputField placeholder="Email" style={{ marginBottom: 16 }} />
      <InputField placeholder="Password" style={{ marginBottom: 24 }} />
      <StyledButton primary style={{ marginBottom: 16 }}  onPress={() => navigation.navigate("SetupProfile")}>Create Account</StyledButton>
      <StyledButton style={{ marginBottom: 16 }} onPress={() => navigation.navigate("Login")}> Go to Login </StyledButton>
    </MainContainer>
  );
};

export default Signup;
