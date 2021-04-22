import React from 'react';
import styled from "styled-components/native";
import colors from "../variables/color";

const Button = styled.TouchableOpacity`
  padding: 16px 10px;
  background-color: ${props => props.primary ? colors.primary : colors.secondary};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-transform: none;
`

const ButtonText = styled.Text`
  font-size: 16px;
  font-family: "Manrope_500Medium";
  color: ${colors.text};
`;

const StyledButton = ({children, primary, style, onPress}) => {
  return (
    <Button primary={primary} style={style} onPress={onPress}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}

export default StyledButton;