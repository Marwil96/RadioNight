import React from "react";
import styled from "styled-components/native";
import colors from "../variables/color";

const Wrapper = styled.TouchableOpacity`
  padding: 16px 12px;
  background-color: ${props => props.primary ? colors.primary : colors.secondary};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: none;
  width: 100%;
  margin-bottom: 12px;
  flex-direction: row;
`;

const ButtonTitle = styled.Text`
  font-size: 20px;
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

const ActionButton = ({ children, primary, style, onPress, borderMode }) => {
  return (
    <Wrapper
      primary={primary}
      style={style}
      onPress={onPress}
      borderMode={borderMode}
    >
      <ButtonTitle>{children}</ButtonTitle>
      <ButtonAction> Add  -> </ButtonAction>
    </Wrapper>
  );
};

export default ActionButton;
