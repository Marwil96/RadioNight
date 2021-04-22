import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons"; 
import colors from "../variables/color";
import { Span } from "./Span";
import { Title } from "./Title";

const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: space-between;
`

const LeftColumn = styled.View`
  display: flex;
  flex-direction: column;
`

const ProfileImage = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 1000;
  background-color: ${colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`


const ProfileImageUpload = ({style}) => {
  return (
    <Wrapper style={style}>
      <LeftColumn>
        <Title style={{ fontSize: 20, marginBottom: 3 }}>Profile Image</Title>
        <Span>File Formats: JPEG or PNG</Span>
      </LeftColumn>
      <ProfileImage> <AntDesign name="user" size={64} color="white" /> </ProfileImage>

    </Wrapper>
  );
}

export default ProfileImageUpload;