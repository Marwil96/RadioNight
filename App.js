import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { StyleSheet, Text, View } from 'react-native';
import styled from "styled-components/native";
import Home from './src/views/Home';
import BottomNav from './src/components/BottomNav';
import Signup from './src/views/Signup';
import Login from './src/views/Login';
import ForgotPassword from './src/views/ForgotPassword';
import SetupProfile from './src/views/SetupProfile';
import Discover from './src/views/Discover';
import Following from './src/views/Following';

const HomeStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const FollowingStack = createStackNavigator();
const NavigationStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const DiscoverStackScreen = () => (
  <DiscoverStack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <DiscoverStack.Screen name="Home" component={Discover} />
  </DiscoverStack.Navigator>
);

const FollowingStackScreen = () => (
  <FollowingStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <FollowingStack.Screen name="Home" component={Following} />
  </FollowingStack.Navigator>
);


const TabNavigation = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
    screenOptions={{ headerShown: false }}
    tabBar={(props) => <BottomNav {...props} />}
  >
    <Tab.Screen
      options={{ title: "Home", icon: "home", screen: "Home" }}
      name="HomeStack"
      component={HomeStackScreen}
    />

    <Tab.Screen
      options={{ title: "Discover", icon: "search1", screen: "Discover" }}
      name="DiscoverStack"
      component={DiscoverStackScreen}
    />

    <Tab.Screen
      options={{ title: "Following", icon: "book", screen: "Following" }}
      name="FollowingStack"
      component={FollowingStackScreen}
    />
  </Tab.Navigator>
);



const App = () => {
   let [fontsLoaded] = useFonts({
     Manrope_400Regular,
     Manrope_500Medium,
     Manrope_700Bold,
   });

   if (!fontsLoaded) {
     //  Loader
     return <Text>Loading</Text>;
   }
   
  return (
    <NavigationContainer>
      <NavigationStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#000" },
        }}
      >
        <NavigationStack.Screen name="Signup" component={Signup} />
        <NavigationStack.Screen name="Login" component={Login} />
        <NavigationStack.Screen name="SetupProfile" component={SetupProfile} />
        <NavigationStack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <NavigationStack.Screen
          name="TabNavigation"
          component={TabNavigation}
        />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
}

export default App;