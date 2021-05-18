import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import colors from "../variables/color";
import styled from "styled-components/native";
import { useSelector } from 'react-redux';

const ProfileCircle = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 1000px;
  background-color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 1000px;
  background-color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileTag = ({onPress}) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  return (
    <ProfileCircle onPress={onPress}>
      {user_data?.user_image !== false && user_data?.user_image !== undefined ? (
        <ProfileImage
          source={{
            uri: user_data.user_image,
          }}
        />
      ) : (
        <AntDesign name="user" size={32} color="black" />
      )}
    </ProfileCircle>
  );
}

export default ProfileTag;