import { AntDesign, Entypo } from '@expo/vector-icons';
import React from 'react';
import styled from "styled-components/native";
import colors from "../variables/color";
import ProfileTag from './ProfileTag';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
`

const RightColumn = styled.View`
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.TouchableOpacity`
 margin-left: 16px;
`

const TopNav = () => {
  return (
    <Wrapper>
      <ProfileTag />
      <RightColumn>
        <IconWrapper>
          <Entypo name="radio" size={25} color="white" />
        </IconWrapper>
        <IconWrapper>
          <AntDesign
            name="inbox"
            size={25}
            color="white"
          />
        </IconWrapper>
        <IconWrapper>
          <AntDesign
            name="message1"
            size={25}
            color="white"
          />
        </IconWrapper>
        <IconWrapper>
          <AntDesign
            name="search1"
            size={25}
            color="white"
          />
        </IconWrapper>
      </RightColumn>
    </Wrapper>
  );
}

export default TopNav;