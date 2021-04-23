import React from "react";
import { useState } from "react";
import styled from "styled-components/native";
import colors from "../variables/color";
import { Span } from "./Span";
import StyledButton from "./StyledButton";

const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const CoverArt = styled.Image`
  height: 67px;
  width: 67px;
  margin-right: 12px;
  border-radius: 4px;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;
const Title = styled.Text`
  font-size: 24px;
  font-family: "Manrope_500Medium";
  margin-bottom: 8px;
  color: ${colors.text};
  flex-shrink: 1;
`;
const Subtitle = styled.Text`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: ${colors.text};
`;

const BottomRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


const PodcastDetailsHeader = ({
  onPress,
  title,
  image,
  subtitle,
  desc,
  style,
  isFollowed
}) => {

  const [followingPodcast, setFollowingPodcast] = useState(isFollowed);
  return (
    <Wrapper onPress={onPress} style={style}>
      <CardHeader>
        <CoverArt source={{ uri: image }} />
        <TitleContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleContainer>
      </CardHeader>
      <Span style={{ fontSize: 14, marginBottom: 16 }}>{desc} </Span>
      <BottomRow>
        <StyledButton
          style={{ paddingTop: 10, paddingBottom: 10 }}
          borderMode={followingPodcast}
          onPress={() => setFollowingPodcast(!followingPodcast)}
        >
          {followingPodcast ? "Following Podcast" : "Follow Podcast"}
        </StyledButton>
      </BottomRow>
    </Wrapper>
  );
};

export default PodcastDetailsHeader;
