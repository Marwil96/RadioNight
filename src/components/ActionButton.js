import React from "react";
import styled from "styled-components/native";
import colors from "../variables/color";

const Wrapper = styled.TouchableOpacity`
  padding: 16px 16px;
  background-color: ${props => props.primary ? colors.primary : colors.secondary};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: none;
  width: 100%;
  margin-bottom: 12px;
  flex-direction: row;
  border: ${props => props.borderMode ? '1px solid #D3D3D3' : '0'};
`;

const ButtonTitle = styled.Text`
  /* font-size: 20px; */
  font-size: 18px;
  font-family: "Manrope_500Medium";
  color: ${colors.text};
  flex-shrink: 1;
`;

const ButtonAction = styled.Text`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: ${colors.text};
  text-align: right;
  flex-shrink: 1;
`;

const ActionButton = ({ children, primary, style, onPress, borderMode, action }) => {
  return (
    <Wrapper
      primary={primary}
      style={style}
      onPress={onPress}
      borderMode={borderMode}
    >
      <ButtonTitle>{children}</ButtonTitle>
      <ButtonAction> { action !== undefined ? action : 'Add'}  -> </ButtonAction>
    </Wrapper>
  );
};

export default ActionButton;
