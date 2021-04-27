import { Link, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
  const [email, setEmail] = useState('william_martinsson@hotmail.com')
  const [password, setPassword] = useState('Wille14')
  const { userLoggedIn } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (userLoggedIn) {
      navigation.navigate("TabNavigation");
    }
  }, [userLoggedIn])

  return (
    <MainContainer noAuth>
      <Wrapper>
        <Title style={{ fontSize: 32, marginTop: 48 }}>Login</Title>
        <InputField placeholder="Email" value={email} style={{ marginBottom: 16 }} onChangeText={(text) => setEmail(text)} />
        <InputField placeholder="Password" value={password} style={{ marginBottom: 24 }} onChangeText={(text) => setPassword(text)}  />
        <StyledButton primary style={{marginBottom: 16}} onPress={() => { dispatch(LoginUser({ email: email, password: password }))}}> Login </StyledButton>
        <StyledButton style={{marginBottom: 16}} onPress={() => navigation.navigate("Signup")}> Create Account </StyledButton>
        <HelperText>I forgot my password. <Link to='/ForgotPassword' style={{fontFamily: 'Manrope_500Medium', textDecorationStyle: 'solid', textDecorationColor: '#fff', textDecorationLine: 'underline'}}>Reset Password.</Link></HelperText>
      </Wrapper>
    </MainContainer>
  );
}

export default Login;