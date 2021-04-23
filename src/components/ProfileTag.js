import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import colors from "../variables/color";
import styled from "styled-components/native";

const ProfileCircle = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 1000px;
  background-color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileTag = () => {
  return (
    <ProfileCircle>
      <AntDesign name="user" size={32} color="black" />
    </ProfileCircle>
  );
}

export default ProfileTag;