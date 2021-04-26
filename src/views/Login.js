import { Link } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components/native";
import { LoginUser } from '../actions';
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
  const dispatch = useDispatch();
  const {userLoggedIn} = useSelector((state) => state.AuthReducer);
  
  useEffect(() => {
    dispatch(LoginUser({ email: 'william_martinsson', password: 'Wille14' }));
  }, [])

  useEffect(() => {
    console.log(userLoggedIn)
  }, [userLoggedIn])

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