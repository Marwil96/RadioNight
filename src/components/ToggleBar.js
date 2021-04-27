import React from 'react';
import { useState } from 'react';
import styled from "styled-components/native";
import colors from "../variables/color";

const Wrapper = styled.View`
  padding: 0 16px;
`;

const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.secondary};
  border-radius: 6px;
`

const ToggleItem = styled.TouchableOpacity`
  width: ${props => `${100 / props.amountOfItems}%`};
  background-color: ${props => props.focussed ? colors.primary : colors.secondary};
  border-radius: 6px;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ToggleItemText = styled.Text`
  font-size: 16px;
  font-family: 'Manrope_400Regular';
  color: ${colors.text};
`

const ToggleBar = ({items, onChange, style}) => {
  const [selected, setSelected] = useState(0)
  
  return (
    <Wrapper style={style}>
      <Content>
        {items.map((title, index) => <ToggleItem key={index} amountOfItems={items.length} focussed={selected === index} onPress={() => {setSelected(index), onChange(title)}}><ToggleItemText>{title}</ToggleItemText></ToggleItem> )}
      </Content>
    </Wrapper>
  );
};

export default ToggleBar;