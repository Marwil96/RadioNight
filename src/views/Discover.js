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
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import colors from "../variables/color";
import StyledButton from "../components/StyledButton";

const allCategories = ["Storytelling", "Sports", "Business", 'News', "Crime", "Comedy", "Science", "Documentary", "Chatting", "Politics", "Music", "Technology", "Design", "History"];

const CategoryCard = styled.TouchableOpacity`
  padding: 16px 0;
  width: 48%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.secondary};
  margin-bottom: 16px;
`

const Discover = ({navigation, route}) => {
  const params = route.params;
  const [allPodcasts, setAllPodcasts] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [loading, setLoading] = useState(false)

  const FetchData = async (filter) => {
    setLoading(true)
    const response = await GetAllPodcasts(filter);
    setAllPodcasts(response);
    setSearchResults(response);
    setLoading(false);
  };

    useEffect(() => {
      if(params.filter !== undefined && params.filter !== false) {setSelectedCategory(params.filter)} else {setSelectedCategory(false)}
    }, [params])

    useEffect(() => {
      FetchData(selectedCategory);
    }, [selectedCategory]);

  useEffect(() => {
    if (allPodcasts !== undefined) setSearchResults(FilterSearch(allPodcasts, searchTerm));
  }, [searchTerm])

  return (
    <MainContainer>
      <TopNav />
      <Title style={{ marginLeft: 16, marginBottom: 24 }}>{selectedCategory === false ?  'Search' : `Search in ${selectedCategory}`}</Title>
      <Wrapper>
        <InputField
          style={{ marginBottom: 16 }}
          placeholder="Search after podcasts"
          onChangeText={(text) => setSearchTerm(text)}
        />
      </Wrapper>
      {selectedCategory !== false && <Wrapper style={{marginBottom: 16}}>
        <StyledButton style={{paddingBottom: 12, paddingTop: 12}} onPress={() => setSelectedCategory(false)}>Remove Category Filter</StyledButton>
      </Wrapper>}
      {selectedCategory === false && searchTerm.length < 1 && <Wrapper style={{display: 'flex', marginBottom: 24, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
        {allCategories.map((category, index) => 
          <CategoryCard key={index} onPress={() => setSelectedCategory(category)}>
            <Title style={{marginBottom: 0, fontSize: 16}}>{category}</Title>
          </CategoryCard> 
        )}
      </Wrapper>}
      {!loading ? <View style={{paddingBottom: 200}}>
        {searchResults.map((podcast, index) => {
          if (index < 5 || selectedCategory !== false || searchTerm.length > 0) {
            return (
              <PodcastCard
                title={podcast.title}
                image={podcast.image}
                desc={podcast.desc}
                key={index}
                meta1={podcast.categories.map((item, index) => `${podcast.categories.length - 1 === index ? `${item}.` : `${item}, `}`)}
                meta2={''}
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
      </View> : <View><ActivityIndicator size="large" color={colors.primary} /></View>}
    </MainContainer>
  );
};

export default Discover;
