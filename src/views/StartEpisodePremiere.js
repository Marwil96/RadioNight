import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as rssParser from "react-native-rss-parser";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { AddEpisodePremiere, SchedulePodcastPremiere } from "../actions";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import { Span } from "../components/Span";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";
import colors from "../variables/color";
import { FilterSearch, GetMp3Duration } from "../other/helperFunctions";
import ToggleBar from "../components/ToggleBar";
import { OpenEpisodePlayer } from "../actions/globalActions";

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

const DateWrapper = styled.View`
  padding: 0 16px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;

const StartEpisodePremiere = ({ navigation, route }) => {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(false);
  const [podcast, setPodcast] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hostMessage, setHostMessage] = useState("Welcome to our premiere of Wind of Change. We will be available for questions after the episode");
  const [toggleMode, setToggleMode] = useState('Directly')
  const { title, rss_url, image, id, authors, desc } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    FetchPodcast(rss_url);
  }, [rss_url]);

  const StartEpisodePremiere = async () => {
    setFullPageLoading(true)
    const duration = await GetMp3Duration(selectedPodcast.enclosures[0].url);
    const unFormattedDate = new Date();
    const startTime = new Date(unFormattedDate)
    let startsIn = 0
    if(toggleMode === 'Directly') {
      startsIn = 0
    } else if(toggleMode === '15min') {
      startsIn = 15
    } else {
      startsIn = 30
    }

    startTime.setMinutes ( unFormattedDate.getMinutes() + startsIn);

    const data = {
      title: selectedPodcast.title,
      podcast_name: title,
      desc:
        selectedPodcast.itunes.summary !== undefined &&
        selectedPodcast.itunes.summary,
      image:
        selectedPodcast.itunes.image !== undefined
          ? selectedPodcast.itunes.image
          : image,
      podcast_desc: desc,
      podcast_image: image,
      podcast_id: id,
      episode_is_running: false,
      stream_started: {state: true, episode_starts: startTime },
      host_message: hostMessage,
      play_link: selectedPodcast.enclosures[0].url,
      rss_url: rss_url,
      start_date: unFormattedDate.toString(),
      duration: duration,
    };

    console.log('DURATION', duration)
    
    const response = await AddEpisodePremiere(data);

    var formdata = new FormData();
    console.log('RESPONSE', response)
    formdata.append("episode_id", response.episodeId);
    formdata.append("episode_duration", duration);
    formdata.append("episode_start_time", startsIn);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      "http://radionight.receptsamlingen.website/start-stream",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));


    if (response.success) {
      setFullPageLoading(false);
      navigation.navigate("YourPodcast", { ...route.params });
    } else {
      setFullPageLoading(false);
      console.log("ERROR");
    }
  };

  const FetchPodcast = async (url) => {
    setLoading(true);
    await fetch(url)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        setPodcast({ ...rss, rss_url: url });
        setEpisodes(rss.items);
        setFetched(true);
      });

    setLoading(false);
  };

  useEffect(() => {
    if (podcast.items !== undefined)
      setEpisodes(FilterSearch(podcast.items, searchTerm));
  }, [searchTerm]);

  // var isoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
  // console.log(date, )
  return (
    <MainContainer loading={fullPageLoading}>
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
      <Title style={{ marginLeft: 16 }}>Start Premiere and go Live.</Title>

      <Span style={{ marginLeft: 16, fontSize: 20 }}>
        Pick Episode to Premiere.
      </Span>
      <Wrapper>
        <InputField
          placeholder="Search after podcast"
          style={{ marginBottom: 24 }}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </Wrapper>
      {!selectedPodcast ? (
        <ScrollView horizontal={true}>
          {loading ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : (
            fetched &&
            episodes.map((episode, index) => {
              if (index < 20) {
                return (
                  <PodcastCard
                    style={{ width: 300, paddingRight: 0, marginLeft: 0 }}
                    title={episode.title}
                    subtitle={podcast.title}
                    key={index}
                    onPress={() => setSelectedPodcast(episode)}
                    desc={
                      episode.itunes.summary !== undefined &&
                      episode.itunes.summary
                    }
                    image={
                      episode.itunes.image !== undefined
                        ? episode.itunes.image
                        : podcast.image.url
                    }
                  />
                );
              }
            })
          )}
        </ScrollView>
      ) : (
        <View>
          <PodcastCard
            title={selectedPodcast.title}
            subtitle={podcast.title}
            desc={
              selectedPodcast.itunes.summary !== undefined &&
              selectedPodcast.itunes.summary
            }
            image={
              selectedPodcast.itunes.image !== undefined
                ? selectedPodcast.itunes.image
                : podcast.image.url
            }
          />
          <Wrapper>
            <StyledButton
              onPress={() => setSelectedPodcast(false)}
              style={{ marginBottom: 32 }}
            >
              Pick another Episode
            </StyledButton>
          </Wrapper>
        </View>
      )}
      <Span style={{ marginLeft: 16, fontSize: 20 }}>Run Episode</Span>

      <ToggleBar
        style={{ marginBottom: 32 }}
        items={["Directly", "15min", "30min"]}
        onChange={(value) => setToggleMode(value)}
      />
      <Wrapper style={{ marginBottom: 48 }}>
        <Span style={{ fontSize: 20, marginBottom: 4 }}>
          Message from the host.
        </Span>
        <Span style={{ fontSize: 16, opacity: 0.8, marginBottom: 12 }}>
          Message for the audience that is shown before the start of the
          episode.
        </Span>
        <InputField
          multiline
          placeholder="Welcome to our premiere of Podcast. We will be available for questions after the episode"
          value={hostMessage}
          onChangeText={(text) => setHostMessage(text)}
        />
      </Wrapper>

      <Wrapper style={{ paddingBottom: 100 }}>
        <StyledButton
          onPress={() => StartEpisodePremiere()}
          primary={selectedPodcast !== undefined ? true : false}
        >
          Start Premiere
        </StyledButton>
      </Wrapper>
    </MainContainer>
  );
};

export default StartEpisodePremiere;
