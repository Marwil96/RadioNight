import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons"; 
import colors from "../variables/color";
import { Span } from "./Span";
import { Title } from "./Title";
import UploadImage from './UploadImage';

const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.secondary};
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 8px;
`

const LeftColumn = styled.View`
  display: flex;
  flex-direction: column;
`

const ProfileImage = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 1000px;
  background-color: ${colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`


const ProfileImageUpload = ({style, setImage, userImage}) => {
  return (
    <Wrapper style={style}>
      <LeftColumn>
        <Title style={{ fontSize: 16, marginBottom: 3 }}>Profile Image</Title>
        <Span style={{ marginBottom: 0, fontSize: 14 }}>
          File Formats: JPEG or PNG
        </Span>
      </LeftColumn>
      <UploadImage
        onPress={(image) => setImage(image)}
        desc="Upload Image"
        websiteImage={userImage}
      />
      {/* <ProfileImage>  */}
      {/* <AntDesign style={{margin: 0}} name="user" size={64} color="white" />  */}
      {/* <Title style={{ fontSize: 16, textAlign: 'center', marginBottom: 0}}>Upload Image</Title> */}
      {/* </ProfileImage> */}
    </Wrapper>
  );
}

export default ProfileImageUpload;