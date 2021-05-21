import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import EpisodeChat from '../components/EpisodeChat';
import InputField from '../components/InputField';
import { MainContainer } from '../components/MainContainer';
import { Span } from '../components/Span';
import StyledButton from '../components/StyledButton';
import { Title } from '../components/Title';
import ToggleBar from '../components/ToggleBar';
import { Wrapper } from '../components/Wrapper';
import colors from '../variables/color';

const TopBar = styled.View`
  width: 100%;
  margin-left: 16px;
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const HighlightedTitle = styled.Text`
  color: ${colors.primary};
`


const StopStream = async (episodeId) => {
  var formdata = new FormData();
  formdata.append("episode_id", episodeId);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(
    "http://radionight.receptsamlingen.website/stop-stream",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const DetailsMode = ({ episodeTitle, podcastTitle, hostMessage, setHostMessage, episodeId}) => {
  return (
    <Wrapper>
      <Title style={{ lineHeight: 38 }}>
        Premiere of <HighlightedTitle>{episodeTitle}</HighlightedTitle> by {podcastTitle}.
      </Title>

      <Span style={{fontSize: 20, marginBottom: 8}}>Premiere Status:</Span>
      <Title style={{marginBottom: 24}}><HighlightedTitle>Live</HighlightedTitle></Title>

        <Span style={{ fontSize: 20, marginBottom: 4 }}>
          Message from the host.
        </Span>
        <Span style={{ fontSize: 16, opacity: 0.8, marginBottom: 12 }}>
          Message for the audience that is shown before the start of the
          episode.
        </Span>
        <InputField
          style={{marginBottom: 48}}
          multiline
          placeholder="Welcome to our premiere of Podcast. We will be available for questions after the episode"
          value={hostMessage}
          onChangeText={(text) => setHostMessage(text)}
        />
      <StyledButton onPress={() => StopStream(episodeId)}>End Premiere</StyledButton>
    </Wrapper>
  );
};

const ChatMode = ({episodeId, userId, podcastId, userName, owner,official}) => {
  return (
    <EpisodeChat
      episodeId={episodeId}
      podcastId={podcastId}
      userId={userId}
      userName={userName}
      owner={owner}
      officialBroadCast={official}
    />
  );
}


const PremiereAdmin = ({route, navigation}) => {
  const { user_data, } = useSelector((state) => state.DatabaseReducer);
  const [hostMessage, setHostMessage] = useState("Welcome to our premiere of Wind of Change. We will be available for questions after the episode");
  const [toggleMode, setToggleMode] = useState("Details");
  const { title, image, desc, podcast_name, episode_id, owner, official, podcast_id } = route.params;

  return (
    <MainContainer>
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
      <ToggleBar
        items={["Details", "Chat"]}
        onChange={(value) => setToggleMode(value)}
        style={{marginBottom: 32}}
      />
      {toggleMode === 'Details' && <DetailsMode episodeTitle={title} podcastTitle={podcast_name} hostMessage={hostMessage} setHostMessage={setHostMessage} episodeId={episode_id}/>}
      {toggleMode ==='Chat' && <ChatMode official={official} episodeId={episode_id} podcastId={podcast_id} owner={owner} userId={user_data.user_id} userName={user_data.user_name} />}
      
    </MainContainer>
  );
}

export default PremiereAdmin;