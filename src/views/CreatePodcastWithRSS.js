import React, { useEffect, useState } from 'react';
import * as rssParser from "react-native-rss-parser";
import { ActivityIndicator, Button, ScrollView, View } from 'react-native';
import styled from "styled-components/native";
import InputField from '../components/InputField';
import { MainContainer } from '../components/MainContainer';
import StyledButton from '../components/StyledButton';
import { Title } from '../components/Title';
import ToggleBar from '../components/ToggleBar';
import TopNav from '../components/TopNav';
import { Wrapper } from '../components/Wrapper';
import colors from '../variables/color';
import PodcastCard from '../components/PodcastCard';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePodcast } from '../actions';

const Label = styled.Text`
  font-size: 16px;
  font-family: "Manrope_400Regular";
  color: ${colors.text};
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 4px;
`;

const CoverArt = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 4px;
  margin-left: 16px;
  margin-top: 10px;
`;

const CreatePodcastWithRSS = ({navigation}) => {
  const [toggleMode, setToggleMode] = useState("No");
  const [rssUrl, setRssUrl] = useState('')
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState({})

  const dispatch = useDispatch()
  const { podcastCreated, loading } = useSelector((state) => state.DatabaseReducer);

  useEffect(() => {
    if(podcastCreated) console.log('PODCAST_CREATED')
  }, [podcastCreated])

  const FetchPodcast = async (url) => {
    setFetching(true)
    await fetch(url)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        setData({...rss, rss_url: url})
        setFetched(true)
      });

      setFetching(false)
  }

  return (
    <MainContainer loading={loading}>
      <TopNav />
      <Title style={{ marginLeft: 16 }}>Connect Podcast Feed</Title>
      <Label style={{ marginBottom: 16 }}>
        Do you own or represent the owner of the Podcast?
      </Label>

      <ToggleBar
        style={{ marginBottom: 16 }}
        items={["No", "Yes"]}
        onChange={(value) => setToggleMode(value)}
      />

      <Label style={{ marginBottom: 16 }}>RSS Feed</Label>
      {fetching ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Wrapper style={{ marginBottom: 32 }}>
          <InputField
            style={{ marginBottom: 12 }}
            onChangeText={(text) => setRssUrl(text)}
            placeholder="RSS Feed"
          />
          <StyledButton primary onPress={() => FetchPodcast(rssUrl)}>
            Fetch Details
          </StyledButton>
        </Wrapper>
      )}

      {fetched && (
        <View style={{ paddingBottom: 250 }}>
          <Title style={{ marginLeft: 16, marginBottom: 24 }}>
            RSS Details
          </Title>

          <Label>Title</Label>
          <Title style={{ marginLeft: 16, marginBottom: 16 }}>
            {data.title}
          </Title>

          <Label>Description</Label>
          <Title style={{ marginLeft: 16, marginBottom: 16, fontSize: 16 }}>
            {data.description}
          </Title>

          <Label>Cover Image</Label>
          <CoverArt
            source={{ uri: data.image.url }}
            style={{ marginBottom: 24 }}
          />

          <Label style={{ marginBottom: 16 }}>Last Episodes</Label>
          <ScrollView horizontal={true}>
            {data.items.map((episode, index) => {
              if (index < 20) {
                return (
                  <PodcastCard
                    style={{ width: 300, paddingRight: 0, marginLeft: 0 }}
                    title={episode.title}
                    subtitle={data.title}
                    desc={episode.itunes.summary !== undefined && episode.itunes.summary }
                    image={
                      episode.itunes.image !== undefined
                        ? episode.itunes.image
                        : data.image.url
                    }
                  />
                );
              }
            })}
          </ScrollView>
          <Wrapper>
            <StyledButton primary onPress={() => dispatch(CreatePodcast({data}))}>
              Add Podcast
            </StyledButton>
          </Wrapper>
        </View>
      )}
    </MainContainer>
  );
}

export default CreatePodcastWithRSS;