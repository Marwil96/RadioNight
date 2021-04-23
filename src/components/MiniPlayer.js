import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import styled from "styled-components/native";
import colors from "../variables/color";

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 16px;
  align-items: center;
  justify-content: space-between;
  background: ${colors.smoothBlack};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
`;

const LeftColumn = styled.View`
  display: flex;
  flex-direction: row;
`

const CoverArt = styled.Image`
  height: 64px;
  width: 64px;
  margin-right: 12px;
  border-radius: 4px;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  justify-content: center;
`;
const Title = styled.Text`
  font-size: 16px;
  font-family: "Manrope_500Medium";
  margin-bottom: 3px;
  color: ${colors.text};
  flex-shrink: 1;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  font-family: "Manrope_400Regular";
  color: ${colors.text};
`;

const MiniPlayer = ({image, title, subtitle}) => {
  return (
    <Wrapper style={{  borderBottomColor: '#000', borderBottomWidth: 2}}>
      <LeftColumn>
        <CoverArt source={{ uri: image }} />
        <TitleContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleContainer>
      </LeftColumn>
      <TouchableOpacity style={{padding: 10, position: 'absolute', right: 6}}>
        <Ionicons name="ios-pause" size={24} color="white" />
      </TouchableOpacity>
    </Wrapper>
  );
}

export default MiniPlayer;