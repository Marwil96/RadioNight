import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import {
  View,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
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
  const { user_data } = useSelector((state) => state.DatabaseReducer);
  const dispatch = useDispatch();  

  const [refreshing, setRefreshing] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userLoggedIn && !noAuth) {
      navigation.navigate("Login");
    }

    if(userLoggedIn && user_data?.user_id === undefined) {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
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
            <LottieView
              autoPlay
              loop
              style={{
                width: 100,
                height: 350,
                // backgroundColor: "#eee",
              }}
              source={require("../assets/loading.json")}
            />
          </View>
        ) : (
          children
        )}
      </MainContainerStyle>
    </SafeAreaView>
  );
};

export { MainContainer };
