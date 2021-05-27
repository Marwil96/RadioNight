import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { SignUpUser } from "../actions";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";

const HelperText = styled.Text`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: #fff;
  text-align: center;
`;

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.AuthReducer);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userLoggedIn) {
      navigation.navigate("SetupProfile");
    }
  }, [userLoggedIn]);

  return (
    <MainContainer noAuth>
      <KeyboardAwareScrollView>
        <Wrapper>
          <Title style={{ fontSize: 32, marginTop: 48 }}>Create Account</Title>
          <InputField placeholder="Username" textContentType='username' autoCompleteType='username'  style={{ marginBottom: 16 }} onChangeText={(text) => setUserName(text)} />
          <InputField placeholder="Email" textContentType='emailAddress' autoCompleteType='email' keyboardType='email-address' style={{ marginBottom: 16 }} onChangeText={(text) => setEmail(text)} />
          <InputField placeholder="Password" textContentType='password' secureTextEntry autoCompleteType='password' style={{ marginBottom: 24 }} onChangeText={(text) => setPassword(text)} />
          <StyledButton primary style={{ marginBottom: 16 }} onPress={() => { dispatch(SignUpUser({ userName: userName, email: email, password: password }))}} >Create Account</StyledButton>
          <StyledButton style={{ marginBottom: 16 }} onPress={() => navigation.navigate("Login")}> Go to Login </StyledButton>
        </Wrapper>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

export default Signup;
