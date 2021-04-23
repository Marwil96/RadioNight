import React from "react";
import { useState } from "react";
import styled from "styled-components/native";
import colors from "../variables/color";
import { Span } from "./Span";
import StyledButton from "./StyledButton";

const Wrapper = styled.TouchableOpacity`
  padding: 0 16px;
  margin-bottom: 32px;
  background-color: ${(props) => props.bgColor};
`;

const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 1;
`;

const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  width: 65%;
`;

const CoverArt = styled.Image`
  height: 50px;
  width: 50px;
  margin-right: 10px;
  border-radius: 4px;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;
const Title = styled.Text`
  font-size: 20px;
  font-family: "Manrope_500Medium";
  margin-bottom: 0px;
  color: ${(props) => props.textColor};
  flex-shrink: 1;
`;
const Subtitle = styled.Text`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: ${(props) => props.textColor};
`;

const PodcastPanel = ({
  onPress,
  title,
  image,
  subtitle,
  desc,
  style,
  isFollowed,
  bgColor,
  textColor,
}) => {
  const [followingPodcast, setFollowingPodcast] = useState(isFollowed);
  return (
    <Wrapper
      onPress={onPress}
      style={style}
      bgColor={bgColor}
      textColor={textColor}
    >
      <Content>
        <CardHeader>
          <CoverArt source={{ uri: image }} />
          <TitleContainer>
            <Title textColor={textColor}>{title}</Title>
            <Subtitle textColor={textColor}>{subtitle}</Subtitle>
          </TitleContainer>
        </CardHeader>

          <StyledButton
            style={{ paddingTop: 8, paddingBottom: 8, height: 39, flexShrink: 1 }}
            borderMode={followingPodcast}
            onPress={() => setFollowingPodcast(!followingPodcast)}
          >
            {followingPodcast ? "Following" : "Follow"}
          </StyledButton>
      </Content>
    </Wrapper>
  );
};

export default PodcastPanel;
