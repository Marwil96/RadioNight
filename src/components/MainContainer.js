import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import {
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import colors from "../variables/color";
import MiniPlayer from "./MiniPlayer";
import { useDispatch, useSelector } from "react-redux";
import {FetchAllUserData} from '../actions/index';

export const MainContainerStyle = styled.ScrollView`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  font-family: "Manrope_400Regular";
  padding: 48px 0;
  min-height: 100%;
`;

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const MainContainer = ({ children, noAuth, style, player, loading }) => {
  const navigation = useNavigation();
  const { userLoggedIn } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();  

  const [refreshing, setRefreshing] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userLoggedIn && !noAuth) {
      navigation.navigate("Login");
    }

    if(userLoggedIn) {
      dispatch(FetchAllUserData());
    }

    // if (userLoggedIn && noAuth) {
    //   navigation.navigate("TabNavigation");
    // }
  }, [userLoggedIn]);

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
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
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
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : (
          children
        )}
      </MainContainerStyle>
      {player && <MiniPlayer
        title="Welcome to Jurassic Ar..."
        subtitle="99% Invisible"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTy7v2Vrnp5LhNS7JoKB12kyK9_gxyCjbGFdDf7MkMmXEfvo8XY"
      />}
    </View>
  );
};

export { MainContainer };
