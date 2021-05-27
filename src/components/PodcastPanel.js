import React from "react";
import { useState } from "react";
import styled from "styled-components/native";
import colors from "../variables/color";
import { Span } from "./Span";
import StyledButton from "./StyledButton";
import { StartFollowingPodcast, StopFollowingPodcast } from "../actions";
import { View } from "react-native";

const Wrapper = styled.TouchableOpacity`
  padding: 0 16px;
  margin-bottom: 32px;
  background-color: ${(props) => props.bgColor};
`;

const Content = styled.View`
  display: flex;
  flex-direction: ${props => props.isOpen ? 'column' : 'row'};
  justify-content: space-between;
  align-items: ${props => props.isOpen ? 'flex-start' : 'center'};
  flex-shrink: 1;
`;

const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  margin-bottom: ${(props) => (props.isOpen ? "12px" : "0px")};
  width: ${(props) => (props.isOpen ? "100%" : "65%")};
`;

const CoverArt = styled.Image`
  height: 60px;
  width: 60px;
  margin-right: 12px;
  border-radius: 4px;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;
const Title = styled.Text`
  font-size: 18px;
  font-family: "Manrope_500Medium";
  margin-bottom: 3px;
  color: ${(props) => props.textColor};
  flex-shrink: 1;
`;
const Subtitle = styled.Text`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: ${(props) => props.textColor};
`;

const DescText = styled.Text`
  font-size: 14px;
  margin-bottom: 12px;
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
  podcastId,
  owner
}) => {
  const [followingPodcast, setFollowingPodcast] = useState(isFollowed);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper
      onPress={() => setIsOpen(!isOpen)}
      style={style}
      bgColor={bgColor}
      textColor={textColor}
    >
      <Content isOpen={isOpen}>
        <CardHeader isOpen={isOpen}>
          <CoverArt source={{ uri: image }} />
          <TitleContainer>
            <Title textColor={textColor}>{title}</Title>
            <Subtitle textColor={textColor}>{subtitle}</Subtitle>
          </TitleContainer>
        </CardHeader>
        {isOpen && <DescText  textColor={textColor}>
          {desc}
        </DescText>}

        <View style={{display: 'flex', flexDirection: 'row'}}>
          {/* { isOpen && <StyledButton style={{ paddingTop: 8, paddingBottom: 8, height: 39, flexShrink: 1, marginRight: 12 }} onPress={() => navigation.navigate('ProfilePage', {user_id: owner})}>Visit Host</StyledButton> } */}
          <StyledButton
            style={{ paddingTop: 8, paddingBottom: 8, height: 39, flexShrink: 1 }}
            borderMode={followingPodcast}
            onPress={(id) => {setFollowingPodcast(!followingPodcast), !followingPodcast ? StartFollowingPodcast(podcastId) :StopFollowingPodcast(podcastId)}}
          >
            {followingPodcast ? "Following" : "Follow"}
          </StyledButton>
        </View>
      </Content>
    </Wrapper>
  );
};

export default PodcastPanel;
