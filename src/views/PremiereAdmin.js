import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { OpenEpisodePlayer } from '../actions/globalActions';
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
    "http://radionight.radionight.xyz/stop-stream",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const DetailsMode = ({dispatch, episodeTitle, podcastTitle, hostMessage, setHostMessage, episodeId, episode}) => {
  return (
    <Wrapper style={{paddingBottom: 200}}>
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
      <StyledButton style={{marginBottom: 16}} primary onPress={() => dispatch(OpenEpisodePlayer({ data: { ...episode }, state: true }))}>Go to Livestream</StyledButton>
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
  const { title, image, desc, podcast_name, episode_id, owner, official, podcast_id, host_message} = route.params;
  const [hostMessage, setHostMessage] = useState(host_message);
  const [toggleMode, setToggleMode] = useState("Details");
  const dispatch = useDispatch();

  return (
    <MainContainer>
      <KeyboardAwareScrollView>
        <View style={{display: 'flex', flexDirection: 'column', background:'blue', height: toggleMode === 'Chat' ? Dimensions.get('window').height - 10 : '100%'}}>
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
      {toggleMode === 'Details' && <DetailsMode dispatch={dispatch} episode={route.params} episodeTitle={title} podcastTitle={podcast_name} hostMessage={hostMessage} setHostMessage={setHostMessage} episodeId={episode_id}/>}
      {toggleMode ==='Chat' && <ChatMode official={official} episodeId={episode_id} podcastId={podcast_id} owner={owner} userId={user_data.user_id} userName={user_data.user_name} />}
      </View>
     </KeyboardAwareScrollView>
    </MainContainer>
  );
}

export default PremiereAdmin;