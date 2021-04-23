import React from 'react';
import styled from "styled-components/native";
import colors from "../variables/color";
import { Span } from './Span';

const Wrapper = styled.TouchableOpacity`
  padding: 0 16px;
  margin-bottom: 24px;
`

const Content = styled.View`
  display: flex;
  flex-direction: column;
  background-color: ${colors.secondary};
  border-radius: 12px;
  padding: 12px;
`

const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const CoverArt = styled.Image`
  height: 64px;
  width: 64px;
  margin-right: 12px;
  border-radius: 4px;
`

const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;
const Title = styled.Text`
  font-size: 16px;
  font-family: 'Manrope_500Medium';
  margin-bottom: 3px;
  color: ${colors.text};
  flex-shrink: 1;
`
const Subtitle = styled.Text`
  font-size: 14px;
  font-family: "Manrope_400Regular";
  color: ${colors.text};
`;

const BottomRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const MetaItem = styled.Text`
  font-size: 14px;
  font-family: "Manrope_500Medium";
  color: ${colors.text};
`;

const PodcastCard = ({onPress, title, image, subtitle, desc, meta1, meta2, style }) => {
  return (
    <Wrapper onPress={onPress} style={style}>
      <Content>
        <CardHeader>
          <CoverArt source={{ uri: image }} />
          <TitleContainer>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </TitleContainer>
        </CardHeader>
        <Span style={{ fontSize: 14, marginBottom: 16 }}>{desc} </Span>
        <BottomRow>
          <MetaItem>{meta1}</MetaItem>
          <MetaItem>{meta2}</MetaItem>
        </BottomRow>
      </Content>
    </Wrapper>
  );
}

export default PodcastCard;