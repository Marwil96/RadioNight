import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import { Title } from "../components/Title";
import TopNav from "../components/TopNav";
import { Wrapper } from "../components/Wrapper";
import {GetAllPodcasts} from '../actions/index';
import PodcastCard from "../components/PodcastCard";
import { FilterSearch } from "../other/helperFunctions";
import Card from "../components/Card";
import { View } from "react-native";

const Discover = ({navigation}) => {
  const [allPodcasts, setAllPodcasts] = useState([])
  const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetAllPodcasts();
      setAllPodcasts(response)
      setSearchResults(response)
    }
    FetchData()
  }, [])

  useEffect(() => {
    if (allPodcasts !== undefined) setSearchResults(FilterSearch(allPodcasts, searchTerm));
  }, [searchTerm])

  return (
    <MainContainer>
      <TopNav />
      <Title style={{ marginLeft: 16, marginBottom: 24 }}>Search</Title>
      <Wrapper>
        <InputField
          style={{ marginBottom: 24 }}
          placeholder="Search after podcasts"
          onChangeText={(text) => setSearchTerm(text)}
        />
      </Wrapper>
      <View style={{paddingBottom: 200}}>
        {searchResults.map((podcast, index) => {
          if (index < 20) {
            return (
              <PodcastCard
                title={podcast.title}
                image={podcast.image}
                key={index}
                onPress={() =>
                  navigation.navigate("PodcastDetails", {
                    ...podcast,
                  })
                }
              />
            );
          }
        })}
        {searchResults.length === 0 && <Card />}
      </View>
    </MainContainer>
  );
};

export default Discover;
