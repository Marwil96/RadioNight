import React from "react";
import styled from "styled-components/native";
import colors from "../variables/color";
import { Span } from "./Span";
import StyledButton from "./StyledButton";

const Wrapper = styled.View`
  padding: 0 16px;
  margin-bottom: 24px;
`;

const Content = styled.View`
  display: flex;
  flex-direction: column;
  background-color: ${colors.secondary};
  border-radius: 12px;
  padding: 16px;
`;



const Title = styled.Text`
  font-size: 20px;
  font-family: "Manrope_500Medium";
  margin-bottom: 24px;
  color: ${colors.text};
  flex-shrink: 1;
`;


const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const InviteCard = ({
  onPress,
  title,
  style,
  decline,
  accept
}) => {
  return (
    <Wrapper onPress={onPress} style={style}>
      <Content>
        <Title style={{fontSize: 20}}>{title}</Title>
        <ButtonContainer>
          <StyledButton onPress={accept} primary style={{width: '100%', flexShrink: 1, marginRight: 8, paddingTop: 12, paddingBottom: 12}}>Yes</StyledButton>
          <StyledButton onPress={decline} style={{backgroundColor: '#000', width: '100%', flexShrink: 1, marginLeft: 8, paddingTop: 12, paddingBottom: 12}}>No</StyledButton>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
};

export default InviteCard;
