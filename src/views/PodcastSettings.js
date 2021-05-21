import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { UpdatePodcastDetails } from "../actions";
import ActionButton from "../components/ActionButton";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import { Span } from "../components/Span";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";
import colors from "../variables/color";

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

const ProfileContainer = styled.View`
  padding: 12px 16px;
  margin: 0 16px;
  background-color: ${colors.secondary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`;

const ProfileImage = styled.Image`
  width: 69px;
  height: 69px;
  border-radius: 8px;
`;

const PodcastSettings = ({ navigation, route }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const { title, id, desc, rss_url, image } = route.params;
  const [loading, setLoading] = useState(false);
  const [podcastTitle, setPodcastTitle] = useState();
  const [podcastDesc, setPodcastDesc] = useState();
  const [removePodcastCheck, setRemovePodcastCheck] = useState("");

  const UpdateSettings = async () => {
    setLoading(true);
    // const response = dadadad
    setLoading(false);

    // if (response) {
    //   navigation.goBack();
    // }
  };

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
      <Title style={{ marginLeft: 16, fontSize: 24 }}>Podcast Settings</Title>

      <ProfileContainer style={{ marginBottom: 24 }}>
        <Title style={{ fontSize: 20, marginBottom: 0 }}>{title}</Title>
        <ProfileImage
          source={{
            uri: image,
          }}
        />
      </ProfileContainer>

      <Wrapper>
        <ActionButton
          action="Go to"
          onPress={() =>
            navigation.navigate("PodcastCommunity", { ...route.params, officialBroadcast: true })
          }
        >
          Community
        </ActionButton>
        <ActionButton
          action="Edit"
          onPress={() =>
            navigation.navigate("EditPodcast", { ...route.params })
          }
        >
          Edit Podcast
        </ActionButton>
      </Wrapper>
      <Wrapper style={{ marginBottom: 24, paddingBottom: 200 }}></Wrapper>
    </MainContainer>
  );
};

export default PodcastSettings;
