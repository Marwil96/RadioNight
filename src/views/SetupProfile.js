import React, { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { UpdateUserData } from "../actions";
import CategoryTag from "../components/CategoryTag";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import ProfileImageUpload from "../components/ProfileImageUpload";
import { Span } from "../components/Span";
import StyledButton from "../components/StyledButton";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";


const allCategories = ["Storytelling", "Sports", "Business", 'News', "Crime", "Fiction", "Comedy", "Science", "Documentary", "Chatting", "Politics", "Music", "Technology", "Design", "History"];
const allLanguages = ["English", "German", "French", "Spanish", "Swedish", "Italian", "Norwegian", "Danish", "Finnish", "Russian", "Dutch", "Portuguese"]

const SetupProfile = ({ navigation }) => {
  const [userBio, setUserBio] = useState('');
  const [userImage, setUserImage] = useState(false);
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([]);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [languages, setLanguages] = useState( ['English']);
  const [addLanguagesOpen, setAddLanguagesOpen] = useState(false);

  const UpdateUserDetails = async () => {
    setLoading(true);
    const response = await UpdateUserData({data: {user_image: userImage, bio: userBio !== undefined ? userBio : 'This is my profile!',  favourite_genres: categories, languages: languages }});

    setLoading(false);

    if (response) {
      navigation.navigate("Home");
    }
  };

  return (
    <MainContainer loading={loading}>
      <Wrapper style={{paddingBottom: 200}}>
        <Title style={{ fontSize: 32, marginTop: 48 }}>Profile Settings</Title>
        <ProfileImageUpload style={{ marginBottom: 32 }} setImage={(image) => setUserImage(image)} userImage={undefined} />
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
          display:"flex",
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
        <Title style={{ fontSize: 20, marginBottom: 12 }}>
          Write something about you
        </Title>
        <InputField placeholder="Bio" style={{ marginBottom: 16 }} onChangeText={(text) => setUserBio(text)} />
        <StyledButton
          primary
          onPress={() => UpdateUserDetails()}
          style={{ marginBottom: 16 }}
        >
          Save Profile!
        </StyledButton>
      </Wrapper>
    </MainContainer>
  );
};

export default SetupProfile;
