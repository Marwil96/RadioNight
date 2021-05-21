import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { InviteUserToMod } from "../actions";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import { Span } from "../components/Span";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";

const TopBar = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const AddModerator = ({ navigation, route }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const { title, id, desc, rss_url, image, mods, officialBroadcast } = route.params;
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  const InviteUser = async () => {
    setLoading(true)
    const response = await InviteUserToMod({officialBroadcast: officialBroadcast, podcastId: officialBroadcast ? id : user_data.user_id, userName: userName, podcastTitle: officialBroadcast ? title : user_data.user_name})
    setLoading(false);

    if(response){
      navigation.goBack();
    } else {
      setError(true)
    }
  }

  return (
    <MainContainer loading={loading}>
      <Wrapper>
        <TopBar>
          <ButtonContainer onPress={() => navigation.goBack()}>
            <AntDesign
              style={{ marginRight: 12 }}
              name="back"
              size={24}
              color="white"
            />
            <Title style={{ fontSize: 16 }}>Go Back</Title>
          </ButtonContainer>
        </TopBar>
      </Wrapper>

      <Wrapper>
        <Title>Add Moderator</Title>
        {error && <Span>Something went wrong...</Span>}
        <InputField onChangeText={(text) => setUserName(text)} style={{marginBottom: 24}} placeholder='User name' />
        <StyledButton primary={userName.length > 2} onPress={() => InviteUser()}>Invite to Moderate</StyledButton>
      </Wrapper>

    </MainContainer>
  );
};

export default AddModerator;
