import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import * as rssParser from "react-native-rss-parser";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import {
  AddEpisodePremiere,
  GetAllPodcasts,
  SchedulePodcastPremiere,
  UploadMp3File,
} from "../actions";
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

const FileUploadWrapper = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.secondary};
  padding: 32px 16px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const CreateCommunityPremiere = ({ navigation, route }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(false);
  const [podcast, setPodcast] = useState([]);
  const [mp3File, setMp3File] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDesc, setEpisodeDesc] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(false);
  const [episodeSearchTerm, setEpisodeSearchTerm] = useState("");
  const [hostMessage, setHostMessage] = useState("");
  const [toggleMode, setToggleMode] = useState("Directly");
  const dispatch = useDispatch();

const [allPodcasts, setAllPodcasts] = useState([]);
const [searchResults, setSearchResults] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  const FetchData = async () => {
    const response = await GetAllPodcasts(false);
    setAllPodcasts(response);
    setSearchResults(response);
  };
  FetchData();
}, []);

useEffect(() => {
  if (allPodcasts !== undefined)
    setSearchResults(FilterSearch(allPodcasts, searchTerm));
}, [searchTerm]);


  const StartEpisodePremiere = async () => {
    setFullPageLoading(true);
    const duration = await GetMp3Duration(selectedEpisode.enclosures[0].url);
    const unFormattedDate = new Date();
    const startTime = new Date(unFormattedDate);
    let startsIn = 0;
    if (toggleMode === "Directly") {
      startsIn = 0;
    } else if (toggleMode === "15min") {
      startsIn = 15;
    } else {
      startsIn = 30;
    }

    startTime.setMinutes(unFormattedDate.getMinutes() + startsIn);

    const data = {
      title: selectedEpisode.title,
      podcast_name: selectedPodcast.title,
      desc:
        selectedEpisode.itunes.summary !== undefined &&
        selectedEpisode.itunes.summary,
      image:
        selectedEpisode.itunes.image !== undefined
          ? selectedEpisode.itunes.image
          : selectedPodcast.image,
      podcast_desc: selectedPodcast.desc,
      podcast_image: selectedPodcast.image,
      podcast_id: selectedPodcast.id,
      episode_is_running: false,
      stream_started: { state: true, episode_starts: startTime },
      host_message: hostMessage.length > 0 ? hostMessage : `Welcome to ${selectedEpisode.title}!`,
      play_link: selectedEpisode.enclosures[0].url,
      rss_url: selectedPodcast.rss_url,
      start_date: unFormattedDate.toString(),
      duration: duration,
      from_file: false,
      official: false,
      owner: user_data.user_id
    };

    console.log("DURATION", duration);

    const response = await AddEpisodePremiere(data);

    var formdata = new FormData();
    console.log("RESPONSE", response);
    formdata.append("episode_id", response.episodeId);
    formdata.append("episode_duration", duration);
    formdata.append("episode_start_time", startsIn);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      "http://radionight.radionight.xyz/start-stream",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    if (response.success) {
      setFullPageLoading(false);
      navigation.goBack();
    } else {
      setFullPageLoading(false);
      console.log("ERROR");
    }
  };

  useEffect(() => {
    if(selectedPodcast !== false) {
      FetchPodcast(selectedPodcast.rss_url);
    }
  }, [selectedPodcast]);

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
        {selectedPodcast === false
          ? "Choose Podcast"
          : `Pick Episode from ${selectedPodcast.title}.`}
      </Span>
      {selectedPodcast === false ? (
        <View>
          <Wrapper>
            <InputField
              style={{ marginBottom: 24 }}
              placeholder="Search after podcasts"
              onChangeText={(text) => setSearchTerm(text)}
            />
          </Wrapper>
          <ScrollView horizontal={true}>
            {searchResults.map((podcast, index) => {
              if (index < 20) {
                return (
                  <PodcastCard
                    style={{ marginRight: 0 }}
                    title={podcast.title}
                    image={podcast.image}
                    key={index}
                    onPress={() => setSelectedPodcast({ ...podcast })}
                  />
                );
              }
            })}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Wrapper>
            <InputField
              placeholder="Search after podcast"
              style={{ marginBottom: 24 }}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </Wrapper>
          {!selectedEpisode ? (
            <View>
              <ScrollView horizontal={true}>
                {loading ? (
                  <Wrapper style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <ActivityIndicator color={colors.primary} size="large" />
                  </Wrapper>
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
                          onPress={() => setSelectedEpisode(episode)}
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
              <Wrapper>
                <StyledButton
                  onPress={() => setSelectedPodcast(false)}
                  style={{ marginBottom: 32 }}
                >
                  Pick another podcast
                </StyledButton>
              </Wrapper>
            </View>
          ) : (
            <View>
              <PodcastCard
                title={selectedEpisode.title}
                subtitle={podcast.title}
                desc={
                  selectedEpisode.itunes.summary !== undefined &&
                  selectedEpisode.itunes.summary
                }
                image={
                  selectedEpisode.itunes.image !== undefined
                    ? selectedEpisode.itunes.image
                    : podcast.image.url
                }
              />
              <Wrapper>
                <StyledButton
                  onPress={() => setSelectedEpisode(false)}
                  style={{ marginBottom: 32 }}
                >
                  Pick another Episode
                </StyledButton>
              </Wrapper>
            </View>
          )}
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
          primary={selectedEpisode !== undefined ? true : false}
        >
          Start Premiere
        </StyledButton>
      </Wrapper>
    </MainContainer>
  );
};

export default CreateCommunityPremiere;
