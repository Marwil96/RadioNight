import { Link } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import styled from "styled-components/native";
import InputField from '../components/InputField';
import { MainContainer } from '../components/MainContainer';
import StyledButton from "../components/StyledButton";
import { Title } from '../components/Title';
import { Wrapper } from '../components/Wrapper';

const HelperText = styled.Text`
  font-size: 16px;
  font-family: 'Manrope_400Regular';
  color: #fff;
  text-align: center;
`;

const Login = ({navigation}) => {
  return (
    <MainContainer>
      <Wrapper>
        <Title style={{ fontSize: 32, marginTop: 48 }}>Login</Title>
        <InputField placeholder="Email" style={{ marginBottom: 16 }} />
        <InputField placeholder="Password" style={{ marginBottom: 24 }} />
        <StyledButton primary style={{marginBottom: 16}} onPress={() => navigation.navigate("TabNavigation")}> Login </StyledButton>
        <StyledButton style={{marginBottom: 16}} onPress={() => navigation.navigate("Signup")}> Create Account </StyledButton>
        <HelperText>I forgot my password. <Link to='/ForgotPassword' style={{fontFamily: 'Manrope_500Medium', textDecorationStyle: 'solid', textDecorationColor: '#fff', textDecorationLine: 'underline'}}>Reset Password.</Link></HelperText>
      </Wrapper>
    </MainContainer>
  );
}

export default Login;