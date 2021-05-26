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
import { AddOwnershipToPodcast, CheckIfRSSFeedIsInUse, CreatePodcast } from '../actions';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Linking from "expo-linking";

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
  const [error, setError] = useState({message: '', state: false, type:'', data: {}})
  const [data, setData] = useState({})

  const dispatch = useDispatch()
  const { podcastCreated, loading } = useSelector((state) => state.DatabaseReducer);

  // useEffect(() => {
  //   if(podcastCreated) navigation.navigate('Home')
  // }, [podcastCreated])

  const FetchPodcast = async (url) => {
    setError({message: '', state: false, type:'', data: {}})
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

  const CreatePodcastHelper = async () => {
    const official = toggleMode === "No" ? false : true;
    const { rssFeedExists, podcastData} = await CheckIfRSSFeedIsInUse(data.rss_url);

    if(rssFeedExists && !podcastData.verified_ownership && official) {
      console.log('Add ownership to podcast and make it official')
      dispatch(AddOwnershipToPodcast({...data, podcast_id: podcastData.id, verified_ownership: false, official: true}));
      navigation.navigate("Home");
    } else if(rssFeedExists && podcastData.verified_ownership && podcastData.official && official) {
      console.log('Someone already owns this podcast.')
      setError({message: "Someone already owns this podcasts, if you dont think thats right. Contact us!", state: true, type:'already_owns', data: podcastData})
    } else if(rssFeedExists && !official) {
      console.log("This podcast already exists in Radio Night");
      setError({message: "This podcast already exists in Radio Night, check it out!", state: true, type:'exists', data: podcastData})
    } else if(!rssFeedExists) {
      dispatch(CreatePodcast({...data, verified_ownership: false, official: toggleMode === 'No' ? false : true}));
      navigation.navigate("Home");
      console.log('This Podcast Does Not Exist in RadioNight')
    }
    // dispatch(CreatePodcast({...data, verified_ownership: false, official: toggleMode === 'No' ? false : true}))
  }

  return (
    <MainContainer loading={loading}>
      <KeyboardAwareScrollView>
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

        {error.state ? (
          <Wrapper>
            <Title>{error.message}</Title>
            <StyledButton
              primary
              onPress={() => {
                error.type === "exists"
                  ? navigation.navigate("PodcastDetails", { ...error.data })
                  : Linking.openURL("mailto: info@ohhi.se");
              }}
            >
              Go to Podcast
            </StyledButton>
          </Wrapper>
        ) : (
          fetched && (
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
                        key={index}
                        desc={
                          episode.itunes.summary !== undefined &&
                          episode.itunes.summary
                        }
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
                <StyledButton primary onPress={() => CreatePodcastHelper()}>
                  Add Podcast
                </StyledButton>
              </Wrapper>
            </View>
          )
        )}
      </KeyboardAwareScrollView>
    </MainContainer>
  );
}

export default CreatePodcastWithRSS;