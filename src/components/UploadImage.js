import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../variables/color";
import * as ImagePicker from "expo-image-picker";
import { Image, Platform, View, TouchableOpacity } from "react-native";
import { Title } from "./Title";

const UploadImageWrapper = styled.View`
  /* border: 1px solid ${colors.primary}; */
  width: 100px;
  height: 100px;
  border-radius: 1000px;
  background-color: ${colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 24px; */
`;

const RecipeImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 1000px;
`;

const UploadImage = ({
  desc,
  onPress,
  websiteImage,
  style,
  icon,
  iconHeight,
  iconStyle,
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(websiteImage);
  }, [websiteImage]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri, result)
      onPress(result.uri);
      // await UploadImageAction(result)
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {image ? (
        <RecipeImage style={style} source={{ uri: image }} />
      ) : (
        <UploadImageWrapper style={{ ...style }}>
          {/* <AntDesign
            name={icon ? icon : "camerao"}
            size={iconHeight ? iconHeight : 46}
            color={colors.primary}
            style={{ marginRight: 16, ...iconStyle }}
          /> */}
          <Title style={{ fontSize: 16, textAlign: 'center', marginBottom: 0 }}>
            {desc}
          </Title>
        </UploadImageWrapper>
      )}
    </TouchableOpacity>
  );
};

export default UploadImage;
