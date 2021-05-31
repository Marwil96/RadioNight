import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../variables/color";
import { Title } from "./Title";

const Wrapper = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: ${props => props.primary ? colors.primary : colors.secondary};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-right: 12px;
  margin-bottom: 16px;
`

const RemoveSymbol = styled.View`
  position: absolute;
  right: 0;
  width: 14px;
  height: 14px;
  border-radius: 100px;
  background-color: #C4C4C4;
  top: -3px;
  right: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryTag = ({style, children, onPress, primary, add, remove}) => {
  return (
    <Wrapper style={style} onPress={onPress} primary={primary}>
      {add && <RemoveSymbol>
        <AntDesign name="plus" size={10} color="black" />
      </RemoveSymbol>}

       {remove && <RemoveSymbol>
        <AntDesign name="minus" size={10} color="black" />
      </RemoveSymbol>}
      <Title style={{ fontSize: 16, marginBottom: 0 }}>{children}</Title>
    </Wrapper>
  );
}

export default CategoryTag;