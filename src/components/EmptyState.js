import React from 'react';
import styled from 'styled-components/native';
import colors from '../variables/color';
import StyledButton from "../components/StyledButton";

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  align-items: center;
`

const Image = styled.Image`
  border-radius: 1000px;
  width: 189px;
  height: 189px;
  margin-bottom: 16px;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${colors.text};
  text-align: center;
  font-family: "Manrope_500Medium";
`;

const Subtitle = styled.Text`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 16px;
  color: ${colors.text};
  font-family: "Manrope_400Regular";
  text-align: center;
`;

const EmptyState = ({imageUrl, title, subtitle, buttonText, onPress}) => {
  return (
    <Wrapper>
      <Image source={{uri: imageUrl}} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <StyledButton style={{width: '100%', paddingTop: 12, paddingBottom: 12}} primary onPress={onPress}>{buttonText}</StyledButton>
    </Wrapper>
  )
}

export default EmptyState;