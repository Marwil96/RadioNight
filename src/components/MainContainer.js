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

export const MainContainerStyle = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  font-family: "Manrope_400Regular";
  padding: 48px 16px;
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
        )
     }
    </MainContainerStyle>
  );
};

export { MainContainer };
