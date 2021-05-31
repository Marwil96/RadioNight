import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
// import { Scrollbars } from "react-custom-scrollbars";
import styled from "styled-components/native";
import colors from "../variables/color";
import { Title } from "./Title";
import { TouchableOpacity } from "react-native-gesture-handler";
// import useOutsideAlerter from "../functions/outsideAlert";
// import FatArrow from "./../assets/fatarrow.svg";

const Wrapper = styled.View`
  position: relative;
  z-index: 100;
  padding: 0 16px;
  margin-bottom: 24px;
`;

const Content = styled.ScrollView`
  background-color: #323741;
  border: 1px solid #686868;
  padding: 12px 8px;
  border-radius:1px;
  left: 16px;
  top: 39px;
  display: flex;
  flex-direction: column;
  position: absolute !important;
  width: 100%;
  /* max-height: 300px; */
`;

const Header = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius:1px;
  background-color: #292f3a;
  border: 0;
  padding: 8px 12px;
  margin-bottom: 4px;

  svg {
    height: 6px;
    path {
      background-color: #fff;
    }
  }
`;

const Item = styled.View`
  color: #a7afc2;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  z-index: 10000;
`;

const OptionItem = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${colors.text};
  font-family: "Manrope_500Medium";
  padding-bottom: 6px;
  borderBottomWidth: 1px;
  borderBottomColor: ${colors.smoothBlack};
`;

const Dropdown = ({ options, onSelect, placeholder, modifier, setDropdownActive }) => {
  const [active, setActive] = useState(false);
  const [activeOption, setActiveOption] = useState(placeholder);
  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef, setActive);

  useEffect(() => {
    setActiveOption(placeholder);
  }, [placeholder]);

  return (
    <Wrapper ref={wrapperRef}>
      <Header onPress={() => {setActive(!active); setDropdownActive(!active)}} className={`${modifier}`}>
        <Title style={{ marginBottom: 0, fontSize: 16 }}>
          {!activeOption ? "Select Language" : activeOption}
        </Title>
        {/* <FatArrow /> */}
      </Header>
      {active && (
        <Content keyboardShouldPersistTaps="always">
          {options.map((option, index) => (
            <TouchableOpacity
              onPress={() => {
                setActiveOption(option);
                onSelect(option);
                setActive(false);
                setDropdownActive(false)
              }}
            >
              <Item>
                <OptionItem
                  style={options.length - 1 === index && { marginBottom: 0 }}
                >
                  {option}
                </OptionItem>
              </Item>
            </TouchableOpacity>
          ))}
        </Content>
      )}
    </Wrapper>
  );
};

export default Dropdown;
