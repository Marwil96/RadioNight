import React from 'react';
import styled from "styled-components/native";
import colors from "../variables/color";

const Button = styled.TouchableOpacity`
  padding: 16px 10px;
  background-color: ${props => props.borderMode ? colors.background : props.primary ? colors.primary : colors.secondary};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${props => props.borderMode ? '1px dashed #FFF' : 'none'}
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-transform: none;
`

const ButtonText = styled.Text`
  font-size: 16px;
  font-family: "Manrope_500Medium";
  color: ${props => props.borderMode ? colors.text : colors.text};
`;

const StyledButton = ({children, primary, style, onPress, borderMode}) => {
  return (
    <Button primary={primary} style={style} onPress={onPress} borderMode={borderMode}>
      <ButtonText borderMode={borderMode}>{children}</ButtonText>
    </Button>
  );
}

export default StyledButton;