import React from 'react';
import styled from 'styled-components/native';
import colors from '../variables/color';
import { Span } from './Span';
import StyledButton from './StyledButton';
import { Title } from './Title';
import * as Linking from "expo-linking";

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

const Card = () => {
  return (
    <Wrapper>
      <Content>
        <Title style={{fontSize: 20, marginBottom: 8}}>Cant find what you are looking for?</Title>
        <Span style={{fontSize: 16, marginBottom: 24}}>Either send us an email with your suggestion or connect the podcast yourself to Radio Night. Through the button in the top right of your screen.</Span>
        <StyledButton onPress={() => Linking.openURL("mailto: info@ohhi.se")} primary style={{paddingTop: 12, paddingBottom: 12}}>Let us know</StyledButton>
      </Content>
    </Wrapper>
  )
}

export default Card;