import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { UpdatePodcastDetails } from '../actions';
import InputField from '../components/InputField';
import { MainContainer } from '../components/MainContainer';
import { Span } from '../components/Span';
import StyledButton from '../components/StyledButton';
import { Title } from '../components/Title';
import { Wrapper } from '../components/Wrapper';

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

const EditPodcast = ({navigation, route}) => {
  const { title, id, desc, rss_url } = route.params;
  const [loading, setLoading] = useState(false);
  const [podcastTitle, setPodcastTitle] = useState(title);
  const [podcastDesc, setPodcastDesc] = useState(desc);
  const [podcastRSSUrl, setPodcastRSSUrl] = useState(rss_url);
  const [removePodcastCheck, setRemovePodcastCheck] = useState('')

  const UpdateSettings = async () => {
    setLoading(true)
    const response = await UpdatePodcastDetails({data:{title: podcastTitle, desc: podcastDesc, rss_url: podcastRSSUrl}, podcastId: id})
    console.log(response)
    setLoading(false);

    if(response) {
      navigation.goBack()
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
      <Title style={{ marginLeft: 16, fontSize: 24 }}>Settings</Title>
      <Wrapper style={{ marginBottom: 24 }}>
        <Span style={{ fontSize: 20, marginBottom: 12 }}>Podcast Title</Span>
        {/* <Span style={{ fontSize: 16, opacity: 0.8, marginBottom: 12 }}>
          Message for the audience that is shown before the start of the
          episode.
        </Span> */}
        <InputField
          placeholder="Planet Money"
          value={podcastTitle}
          onChangeText={(text) => setPodcastTitle(text)}
        />
      </Wrapper>
      <Wrapper style={{ marginBottom: 24 }}>
        <Span style={{ fontSize: 20, marginBottom: 12 }}>
          Podcast Description
        </Span>
        <InputField
          placeholder={`The economy explained. Imagine you could call up a friend and say, "Meet me at the bar and tell me what's going on with the economy." Now imagine that's actually a fun evening.`}
          multiline={true}
          value={podcastDesc}
          onChangeText={(text) => setPodcastDesc(text)}
        />
      </Wrapper>

      <Wrapper style={{ marginBottom: 24 }}>
        <Span style={{ fontSize: 20, marginBottom: 12 }}>RSS Feed</Span>
        <InputField
          placeholder={`https://example.com/rss`}
          value={podcastRSSUrl}
          onChangeText={(text) => setPodcastRSSUrl(text)}
        />
      </Wrapper>
      <Wrapper style={{ marginBottom: 32 }}>
        <StyledButton
        onPress={() => UpdateSettings()}
        primary={podcastTitle !== undefined && podcastDesc !== undefined ? true : false}
        >
          Save Settings
        </StyledButton>
      </Wrapper>

      <Wrapper style={{ marginBottom: 24, paddingBottom: 200 }}>
        {/* <Span style={{ fontSize: 20, marginBottom: 12 }}>
          Fill in the pocast name to remove podcast.
        </Span>
        <InputField
          style={{ marginBottom: 24 }}
          placeholder="Podcast Name"
          value={removePodcastCheck}
          onChangeText={(text) => setRemovePodcastCheck(text)}
        />
        <StyledButton
        // onPress={() => StartEpisodePremiere()}
         primary={removePodcastCheck === title ? true : false}
        >
          Remove Podcast
        </StyledButton> */}
      </Wrapper>
    </MainContainer>
  );
}

export default EditPodcast;