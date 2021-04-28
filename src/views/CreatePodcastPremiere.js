import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as rssParser from "react-native-rss-parser";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { SchedulePodcastPremiere } from "../actions";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import { Span } from "../components/Span";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";
import colors from "../variables/color";
import { FilterSearch } from "../other/helperFunctions";

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
`

const CreatePodcastPremiere = ({ navigation, route }) => {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [podcast, setPodcast] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [timzoneOffset, setTimezoneOffset] = useState(0);
  const [selectedPodcast, setSelectedPodcast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState()
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [time, setTime] = useState();
  const { title, rss_url, image, id, authors, desc } = route.params;

  useEffect(() => {
    FetchPodcast(rss_url);
  }, [rss_url])

  const addZeroBeforeDate = (n) => {
    return (n < 10 ? "0" : "") + n;
  }

  const SchedulePremiereHelper = async () => {
    const unFormattedDate = new Date(`${date.trim()}T${time}:00`);
    const formattedDate = unFormattedDate.setHours(unFormattedDate.getHours() + (timzoneOffset / 60));
    const data = {
      title:selectedPodcast.title,
      podcast_name: title,
      desc:selectedPodcast.itunes.summary !== undefined && selectedPodcast.itunes.summary,
      image: selectedPodcast.itunes.image !== undefined ? selectedPodcast.itunes.image : image,
      podcast_desc: desc,
      podcast_image: image,
      podcast_id: id,
      rss_url: rss_url,
      start_date: unFormattedDate
    }

    console.log(data)

    
    const response = await SchedulePodcastPremiere(data);
    if(response) {navigation.navigate("YourPodcast", { ...route.params });} else {console.log("ERROR")}
  }

  const FetchPodcast = async (url) => {
    setLoading(true);
    await fetch(url)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        setPodcast({ ...rss, rss_url: url });
        setEpisodes(rss.items)
        setFetched(true);
      });

    setLoading(false);
  };

  useEffect(() => {
    if (podcast.items !== undefined) setEpisodes(FilterSearch(podcast.items, searchTerm));
  }, [searchTerm])

  // var isoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
  // console.log(date, )
  return (
    <MainContainer>
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
      <Title style={{ marginLeft: 16 }}>
        Create your own podcast Premiere.
      </Title>

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
      <Title style={{ marginLeft: 16 }}>Launch Date</Title>
      <Span style={{ marginLeft: 16, fontSize: 20 }}>Date</Span>
      <DateWrapper style={{ marginBottom: 24 }}>
        {date === undefined ? (
          <StyledButton
            title="Show Date Picker"
            onPress={() => setDatePickerVisibility(true)}
            style={{ marginBottom: 24, width: "100%" }}
            primary
          >
            Set Date
          </StyledButton>
        ) : (
          <StyledButton onPress={() => setDatePickerVisibility(true)}>
            Change Date
          </StyledButton>
        )}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setDatePickerVisibility(false),
            console.log(new Date(date).getTimezoneOffset()),
            setTimezoneOffset(new Date(date).getTimezoneOffset()),
            setDate(`${new Date(date).getFullYear()}-${addZeroBeforeDate(new Date(date).getMonth())}-${addZeroBeforeDate(new Date(date).getDate())}`);
          }}
          onCancel={() => setDatePickerVisibility(false)}
        />
        {date !== undefined && (
          <Title style={{ marginBottom: 0 }}>{date}</Title>
        )}
      </DateWrapper>

      <Span style={{ marginLeft: 16, fontSize: 20 }}>Time</Span>
      <DateWrapper style={{marginBottom: 32}}>
        {time === undefined ? (
          <StyledButton
            title="Show Time Picker"
            onPress={() => setTimePickerVisibility(true)}
            style={{ marginBottom: 24, width: "100%" }}
            primary
          >
            Set Time
          </StyledButton>
        ) : (
          <StyledButton onPress={() => setTimePickerVisibility(true)}>
            Change Time
          </StyledButton>
        )}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={(date) => {
            setTimePickerVisibility(false),
              setTime(
                `${addZeroBeforeDate(new Date(date).getHours())}:${addZeroBeforeDate(new Date(date).getMinutes())}`
              );
          }}
          onCancel={() => setTimePickerVisibility(false)}
        />
        {date !== undefined && (
          <Title style={{ marginBottom: 0 }}>{time}</Title>
        )}
      </DateWrapper>

      <Wrapper style={{ paddingBottom: 100 }}>
        <StyledButton
          onPress={() => SchedulePremiereHelper()}
          primary={
            date !== undefined &&
            time !== undefined &&
            selectedPodcast !== undefined
              ? true
              : false
          }
        >
          Schedule Premiere
        </StyledButton>
      </Wrapper>
    </MainContainer>
  );
};

export default CreatePodcastPremiere;
