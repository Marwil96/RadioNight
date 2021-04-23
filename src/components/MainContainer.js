import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import colors from "../variables/color";
import { useScrollToTop } from "@react-navigation/native";
import MiniPlayer from "./MiniPlayer";

export const MainContainerStyle = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  font-family: "Manrope_400Regular";
  padding: 48px 16px;
  min-height: 100%;
`;

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const MainContainer = ({ children, noAuth, style }) => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <View>
      <MainContainerStyle
        style={{ ...style }}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading || refreshing ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color="#071B6A" size="large" />
          </View>
        ) : (
          children
        )}
      </MainContainerStyle>
      <MiniPlayer
        title="Welcome to Jurassic Ar..."
        subtitle="99% Invisible"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTy7v2Vrnp5LhNS7JoKB12kyK9_gxyCjbGFdDf7MkMmXEfvo8XY"
      />
    </View>
  );
};

export { MainContainer };