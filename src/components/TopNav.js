import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from "styled-components/native";
import colors from "../variables/color";
import ProfileTag from './ProfileTag';

const Wrapper = styled.View`
  margin-bottom: 32px;
  padding: 0 16px;
`

const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const RightColumn = styled.View`
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.TouchableOpacity`
 margin-left: 16px;
`

const TopNav = ({onRefresh}) => {
  const navigation = useNavigation();

  return (
    <Wrapper>
      <Content>
        <ProfileTag onPress={() =>  navigation.navigate("UserSettings")} />
        <RightColumn>
          {onRefresh !== undefined && <IconWrapper onPress={onRefresh}>
            <MaterialIcons name="refresh" size={25} color="white" />
          </IconWrapper>}
          <IconWrapper
            onPress={() => navigation.navigate("ChooseWayOfCreatingPodcast")}
          >
            <Entypo name="radio" size={25} color="white" />
          </IconWrapper>
          {/* <IconWrapper>
            <AntDesign name="inbox" size={25} color="white" />
          </IconWrapper> */}
          {/* <IconWrapper>
            <AntDesign name="message1" size={25} color="white" />
          </IconWrapper> */}
          <IconWrapper onPress={() => navigation.navigate("DiscoverStack", { screen: 'Discover' })}>
            <AntDesign name="search1" size={25} color="white" />
          </IconWrapper>
        </RightColumn>
      </Content>
    </Wrapper>
  );
}

export default TopNav;