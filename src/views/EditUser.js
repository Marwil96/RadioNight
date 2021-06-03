import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { UpdatePodcastDetails, UpdateUserData } from "../actions";
import CategoryTag from "../components/CategoryTag";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import ProfileImageUpload from "../components/ProfileImageUpload";
import { Span } from "../components/Span";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";

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

const allCategories = ["Storytelling", "Sports", "Business", 'News', "Crime", "Fiction", "Comedy", "Science", "Documentary", "Chatting", "Politics", "Music", "Technology", "Design", "History"];
const allLanguages = ["English", "German", "French", "Spanish", "Swedish", "Italian", "Norwegian", "Danish", "Finnish", "Russian", "Dutch", "Portuguese"]


const EditUser = ({ navigation, route }) => {
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(user_data.user_name);
  const [userBio, setUserBio] = useState(user_data.bio);
  const [userImage, setUserImage] = useState(user_data.user_image);
  const [categories, setCategories] = useState(user_data.favourite_genres !== undefined && user_data.favourite_genres.length > 0 ? [...user_data.favourite_genres] : []);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [languages, setLanguages] = useState(user_data.languages !== undefined && user_data.languages.length > 0 ? [...user_data.languages] : []);
  const [addLanguagesOpen, setAddLanguagesOpen] = useState(false);

  const UpdateUserDetails = async () => {
    setLoading(true);
    const response = await UpdateUserData({data: {user_image: userImage, bio: userBio !== undefined ? userBio : 'This is my profile!', user_name: userName, favourite_genres: categories, languages: languages }});
    console.log(response);
    setLoading(false);

    if (response) {
      navigation.goBack();
    }
  };

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
      <Wrapper>
        <ProfileImageUpload
          setImage={(image) => setUserImage(image)}
          userImage={userImage}
        />
      </Wrapper>
      <Wrapper style={{ marginBottom: 24 }}>
        <Span style={{ fontSize: 20, marginBottom: 12 }}>Username</Span>
        <InputField
          placeholder="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
      </Wrapper>
      <Span style={{ fontSize: 20, marginBottom: 12, marginLeft: 16 }}>
        Languages
      </Span>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 24,
        }}
      >
        {languages.length <= 6 && (
          <CategoryTag
            primary
            onPress={() => setAddLanguagesOpen(!addLanguagesOpen)}
          >
            {addLanguagesOpen ? "Close" : "Add +"}
          </CategoryTag>
        )}
        {addLanguagesOpen
          ? allLanguages.map((title, index) => {
              if (!languages.includes(title)) {
                return (
                  <CategoryTag
                    key={index}
                    onPress={() => {
                      setLanguages([...languages, title]),
                        setAddLanguagesOpen(false);
                    }}
                    add
                  >
                    {title}
                  </CategoryTag>
                );
              }
            })
          : languages.map((title, index) => (
              <CategoryTag
                key={index}
                onPress={() => {
                  setLanguages(languages.filter((e) => e !== title)),
                    setAddLanguagesOpen(false);
                }}
                remove
              >
                {title}
              </CategoryTag>
            ))}
      </View>
      <Span style={{ fontSize: 20, marginBottom: 12, marginLeft: 16 }}>
        Favourite Genres
      </Span>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 24,
        }}
      >
        {categories.length <= 6 && (
          <CategoryTag
            primary
            onPress={() => setAddCategoryOpen(!addCategoryOpen)}
          >
            {addCategoryOpen ? "Close" : "Add +"}
          </CategoryTag>
        )}
        {addCategoryOpen
          ? allCategories.map((title, index) => {
              if (!categories.includes(title)) {
                return (
                  <CategoryTag
                    key={index}
                    onPress={() => {
                      setCategories([...categories, title]),
                        setAddCategoryOpen(false);
                    }}
                    add
                  >
                    {title}
                  </CategoryTag>
                );
              }
            })
          : categories.map((title, index) => (
              <CategoryTag
                key={index}
                onPress={() => {
                  setCategories(categories.filter((e) => e !== title)),
                    setAddCategoryOpen(false);
                }}
                remove
              >
                {title}
              </CategoryTag>
            ))}
      </View>
      <Wrapper style={{ marginBottom: 24 }}>
        <Span style={{ fontSize: 20, marginBottom: 12 }}>Your Bio</Span>
        <InputField
          placeholder={`The economy explained. Imagine you could call up a friend and say, "Meet me at the bar and tell me what's going on with the economy." Now imagine that's actually a fun evening.`}
          multiline={true}
          value={userBio}
          onChangeText={(text) => setUserBio(text)}
        />
      </Wrapper>

      <Wrapper style={{ marginBottom: 32, paddingBottom: 200 }}>
        <StyledButton
          onPress={() => UpdateUserDetails()}
          primary={userName !== undefined ? true : false}
        >
          Save Update
        </StyledButton>
      </Wrapper>

      <Wrapper style={{ marginBottom: 24, paddingBottom: 200 }}></Wrapper>
    </MainContainer>
  );
};

export default EditUser;
