import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import colors from "../variables/color";
import CategoryTag from "./CategoryTag";
import { Span } from "./Span";
import StyledButton from "./StyledButton";

const Wrapper = styled.View`
  padding: 0 16px;
  margin-bottom: -12px;
  /* background-color: ${props => props.bgColor}; */
`;

const Content = styled.View`
  display: flex;
  flex-direction: column;
`

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
  margin-bottom: 1px;
  color: ${props => props.textColor};
  flex-shrink: 1;
`;
const Subtitle = styled.Text`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: ${props => props.textColor};
`;

const BottomRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ReadMore = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-family: "Manrope_700Bold";
`;


const PodcastDetailsHeader = ({
  onPress,
  title,
  image,
  subtitle,
  desc,
  style,
  isFollowed,
  bgColor,
  textColor,
  onButtonPress,
  categories,
  official
}) => {

  const [followingPodcast, setFollowingPodcast] = useState(isFollowed);
  const [descLimit, setDescLimit] = useState(150);
  const navigation = useNavigation();

  return (
    <Wrapper onPress={onPress} style={style} bgColor={bgColor} textColor={textColor}>
      <Content>
        <CardHeader>
          <CoverArt source={{ uri: image }} />
          <TitleContainer>
            <Title textColor={textColor}>{title}</Title>
            {official  ? <Subtitle textColor={colors.primary}>Official</Subtitle> : <Subtitle textColor={textColor}>Community Managed</Subtitle>}
          </TitleContainer>
        </CardHeader>
        <Span style={{ fontSize: 16, marginBottom: 16, lineHeight: 24, color:textColor }}>{desc.slice(0, descLimit)}{descLimit < 151 && desc.length > 150 && '...'}  { desc.length > 150 ? descLimit < 151 ? <ReadMore onPress={() => setDescLimit(10000)}>Read More</ReadMore> :  <ReadMore onPress={() => setDescLimit(150)}>Read Less</ReadMore> : '' } </Span>
        
        <BottomRow>
          <StyledButton
            style={{ paddingTop: 10, paddingBottom: 10 }}
            // borderMode={followingPodcast}
            primary={!followingPodcast}
            onPress={() => {setFollowingPodcast(!followingPodcast), onButtonPress(!followingPodcast)}}
          >
            {followingPodcast ? "Following Podcast" : "Follow Podcast"}
          </StyledButton>
        </BottomRow>
        <View 
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            paddingLeft: 0,
            paddingRight: 16,
            marginBottom: 6,
            paddingTop: 16
          }}>
          {categories.map((category, index) => <CategoryTag key={index} onPress={() =>  navigation.navigate("DiscoverStack", { screen: 'Discover', params:{filter: category}})}>{category}</CategoryTag>)}
        </View >
      </Content>
    </Wrapper>
  );
};

export default PodcastDetailsHeader;
