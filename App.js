import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import rootReducer from "./src/reducers/index";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import colors from "./src/variables/color";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { StyleSheet, Text, View, LogBox, Modal } from "react-native";
import styled from "styled-components/native";
import Home from './src/views/Home';
import BottomNav from './src/components/BottomNav';
import Signup from './src/views/Signup';
import Login from './src/views/Login';
import ForgotPassword from './src/views/ForgotPassword';
import SetupProfile from './src/views/SetupProfile';
import Discover from './src/views/Discover';
import Following from './src/views/Following';
import PodcastDetails from './src/views/PodcastDetails';
import EpisodeView from './src/views/EpisodeView';
import ChooseWayOfCreatingPodcast from './src/views/ChooseWayOfCreatingPodcast';
import CreatePodcastWithRSS from './src/views/CreatePodcastWithRSS';
import YourPodcasts from './src/views/YourPodcasts';
import YourPodcast from './src/views/YourPodcast';
import ScheduleEpisodePremiere from './src/views/ScheduleEpisodePremiere';
import Search from './src/views/Search';
import RssPlayer from './src/views/RssPlayer';
import MiniPlayer from './src/components/MiniPlayer';
import { parse } from 'react-native-rss-parser';
import { PushRSSPlayer, PushStreamPlayer } from "./src/other/notificationFunctions";
import StartEpisodePremiere from './src/views/StartEpisodePremiere';
import PremiereAdmin from './src/views/PremiereAdmin';
import Constants from 'expo-constants';
import EditPodcast from './src/views/EditPodcast';
import UserSettings from './src/views/UserSettings';
import EditUser from './src/views/EditUser';
import PodcastSettings from './src/views/PodcastSettings';
import PodcastCommunity from './src/views/PodcastCommunity';
import AddModerator from './src/views/AddModerator';
import ProfilePage from './src/views/ProfilePage';
import CreateCommunityPremiere from './src/views/CreateCommunityPremiere';



const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
 });
 
 Notifications.setNotificationCategoryAsync('rssplayer', [
  {
    actionId: 'startaudio',
    identifier:'startaudio', 
    buttonTitle: 'Play',
    isDestructive: false,
    isAuthenticationRequired: false,
    options: {
      opensAppToForeground: false
    }
  },
  {
    actionId: 'pauseaudio',
    identifier:'pauseaudio',
    buttonTitle: 'Pause',
    isDestructive: false,
    isAuthenticationRequired: true,
    options: {
      opensAppToForeground: false
    }
  },
]);

  Notifications.setNotificationCategoryAsync('streamplayer', [
  {
    actionId: 'pausestream',
    identifier:'pausestream',
    buttonTitle: 'Stop Stream',
    isDestructive: true,
    isAuthenticationRequired: true,
    options: {
      opensAppToForeground: false
    }
  },
  // {
  //   actionId: 'three',
  //   buttonTitle: 'Three',
  //   textInput: { submitButtonTitle: 'Three', placeholder: 'Type Something' },
  //   isAuthenticationRequired: false,
  // },
]);

 Notifications.setNotificationHandler({
   handleNotification: async () => ({
     shouldShowAlert: true,
     shouldPlaySound: false,
     shouldSetBadge: false,
   }),
 });

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

const HomeStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const FollowingStack = createStackNavigator();
const NavigationStack = createStackNavigator();
const YourPodcastsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="EpisodeView" screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const YourPodcastsStackScreen = () => (
  <YourPodcastsStack.Navigator initialRouteName="YourPodcasts" screenOptions={{ headerShown: false }}>
    <YourPodcastsStack.Screen name="YourPodcasts" component={YourPodcasts} />
  </YourPodcastsStack.Navigator>
)

const DiscoverStackScreen = () => (
  <DiscoverStack.Navigator
    initialRouteName="Discover"
    screenOptions={{ headerShown: false }}
  >
    <DiscoverStack.Screen name="Discover" component={Discover} />
    <DiscoverStack.Screen name="Search" component={Search} />
  </DiscoverStack.Navigator>
);

const FollowingStackScreen = () => (
  <FollowingStack.Navigator initialRouteName="Following" screenOptions={{ headerShown: false }}>
    <FollowingStack.Screen name="Following" component={Following} />
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
    
    <Tab.Screen
      options={{ title: "Admin", icon: "database", screen: "YourPodcasts" }}
      name="YourPodcastsStack"
      component={YourPodcastsStackScreen}
    />
  </Tab.Navigator>
);

const DataContainer = ({children}) => {
  const { rssPlayerState, rssPlayerData, episodePlayerState, episodePlayerData } = useSelector((state) => state.GlobalActionsReducer);
  const [playing, setPlaying] = useState(false);
  const [startedSound, setStartedSound] = useState(false);
  const [soundDuration, setSoundDuration] = useState(100000);
  const [sound, setSound] = useState(false);
  const [runningEpisode, setRunningEpisode] = useState(false)
  const [runningPodcast, setRunningPodcast] = useState(false);
  const [soundProgress, setSoundProgress] = useState(1);
  const [setEpisodeProgres, setEpisodeProgress] = useState(1);
  // console.log(rssPlayerState);

   const [expoPushToken, setExpoPushToken] = useState("");
   const [notification, setNotification] = useState(false);
   const notificationListener = useRef();
   const responseListener = useRef();

   useEffect(() => {
     registerForPushNotificationsAsync().then((token) =>
       setExpoPushToken(token)
     );

     notificationListener.current =
       Notifications.addNotificationReceivedListener((notification) => {
         setNotification(notification);
       });

     responseListener.current =
       Notifications.addNotificationResponseReceivedListener((response) => {
        //  console.log("NOTIFICATION RESPONSE", response);
         if (response.actionIdentifier === "startaudio") {
           console.log('START STREAM', sound)
          restartSound()
         } else if (response.actionIdentifier === "pauseaudio") {
           console.log("PAUSE STREAM STREAM", sound);
           pauseSound()
         } else if (response.actionIdentifier === "startstream") {
           console.log("START STREAM", sound);
         } else if(response.actionIdentifier === "pausestream") {
           console.log('PAUSE SOUUUUUUND')
           stopSoundCompletely()
         }
       });

     return () => {
       Notifications.removeNotificationSubscription(
         notificationListener.current
       );
       Notifications.removeNotificationSubscription(responseListener.current);
     };
   }, [sound]);

  const playRssEpisode = async () => {
    console.log("Loading Sound");

    if(runningEpisode !== false) {
      await stopSound()
    }
    
    const playProgress = await fetchProgressStorage();
    setSoundProgress(playProgress);
    runningEpisode !== false && await stopSound()
    setRunningEpisode(rssPlayerData.episode)
    setRunningPodcast(rssPlayerData.podcast);
    const { sound } = await Audio.Sound.createAsync({
      uri: rssPlayerData.episode.enclosures[0].url,
    });
    setStartedSound(true)
    sound.playFromPositionAsync(playProgress);
    await sound.setOnPlaybackStatusUpdate(updateStatus);
    Audio.setAudioModeAsync({ staysActiveInBackground: true });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    setPlaying(true);
    PushRSSPlayer({title: rssPlayerData.episode.title, subtitle: rssPlayerData.podcast.title})
  };

  const playEpisode = async () => {
    console.log("Loading Sound");
    setPlaying(true);

    if(runningEpisode !== false) {
      await stopSound()
    }
    
    const playProgress = await fetchEpisodeProgress(episodePlayerData.episode_id);
    setSoundProgress(playProgress);
    runningEpisode !== false && await stopSound()
    setRunningEpisode(episodePlayerData)
    setRunningPodcast(episodePlayerData);
    const { sound } = await Audio.Sound.createAsync({
      uri: episodePlayerData.play_link,
    });
    setStartedSound(true)
    sound.playFromPositionAsync(playProgress);
    // await sound.setOnPlaybackStatusUpdate(updateStatus);
    Audio.setAudioModeAsync({ staysActiveInBackground: true });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    setPlaying(true);
    PushStreamPlayer({title: episodePlayerData.title, subtitle: episodePlayerData.podcast_name});
  };

  const fetchEpisodeProgress = async (episodeId) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

   const result = fetch(
      `http://radionight.receptsamlingen.website/episode-progress/${episodeId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result.episode_progress)
      .catch((error) => console.log("error", error));

    return result
  };


  const fetchProgressStorage = async () => {
    console.log('FETCH_STORAGE')
    try {
    const value = await AsyncStorage.getItem((JSON.stringify(`${rssPlayerData.episode.title}_progress`)));
    if (value !== null) {
      // We have data!!
      // setEpisodeProgress(JSON.parse(value));
      return JSON.parse(value);
    } else {
      return 0
    }
  } catch (error) {
    console.log("ERROR", error)
    return 0
    // Error retrieving data
  }
  }

    const fetchEpisodeProgressStorage = async () => {
    try {
    const value = await AsyncStorage.getItem((JSON.stringify(`${rssPlayerData.episode.title}_progress`)));
    if (value !== null) {
      // We have data!!
      // setEpisodeProgress(JSON.parse(value));
      return JSON.parse(value);
    } else {
      return 0
    }
  } catch (error) {
    console.log("ERROR", error)
    return 0
    // Error retrieving data
  }
  }
  const updateStatus = async (status) => {
    try {
      await AsyncStorage.setItem(JSON.stringify(`${rssPlayerData.episode.title}_progress`), JSON.stringify(status.positionMillis));
    } catch (e) {
      // console.log('CANNOT_SAVE_PROGRESS', e)
      // saving error
    }
    setSoundDuration(status.durationMillis);
    setSoundProgress(status.positionMillis);
  };

  const pauseSound = async () => {
    await sound.pauseAsync();
    setPlaying(false);
  };

  const changeAudioPosition = async (value) => {
    await sound.pauseAsync();
    setPlaying(false);
    setSoundProgress(value);
    // soundObject.setStatusAsync(statusToSet)
  };

  const slidingComplete = async (e) => {
    sound.playFromPositionAsync(soundProgress);
    await sound.playAsync();
    setPlaying(true);
  };

  const restartSound = async () => {
    await sound.playAsync();
    setPlaying(true);
  };

  const stopSound = async () => {
    await sound.unloadAsync();
    setStartedSound(false)
    // setPlaying(false)
  }

  const stopSoundCompletely = async () => {
    console.log('STOP SOUND COMPLETELY')
    await sound.unloadAsync();
    setStartedSound(false);
    setPlaying(false)
  };
  
  // useEffect(() => {
  //   console.log("HEELLOO", sound);
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        backgroundColor: colors.secondary,
      }}
    >
      {rssPlayerData !== undefined && <Modal animationType="slide" transparent={true} visible={rssPlayerState}>
        <RssPlayer
          playSound={() => playRssEpisode()}
          restartSound={restartSound}
          changeAudioPosition={changeAudioPosition}
          slidingComplete={slidingComplete}
          pauseSound={pauseSound}
          soundDuration={soundDuration}
          soundProgress={soundProgress}
          startedSound={startedSound}
          playing={playing}
          episode={rssPlayerData.episode}
          fetchEpisodeProgressStorage={fetchEpisodeProgressStorage}
          podcast={rssPlayerData.podcast}
          runningEpisode={runningEpisode}
          runningPodcast={runningPodcast}
          fetchProgressStorage={fetchProgressStorage}
        />
      </Modal>}

      {episodePlayerData !== undefined && <Modal animationType="slide" transparent={true} visible={episodePlayerState}>
        <EpisodeView
          playSound={() => playEpisode()}
          restartSound={restartSound}
          changeAudioPosition={changeAudioPosition}
          slidingComplete={slidingComplete}
          pauseSound={pauseSound}
          soundDuration={soundDuration}
          soundProgress={soundProgress}
          startedSound={startedSound}
          playing={playing}
          episode={episodePlayerData}
          fetchEpisodeProgressStorage={fetchEpisodeProgressStorage}
          // podcast={episodePlayerData.podcast}
          runningEpisode={runningEpisode}
          runningPodcast={runningPodcast}
          fetchProgressStorage={fetchProgressStorage}
          stopSound={() => stopSoundCompletely()}
        />
      </Modal> 
      }
      {/* <Modal
        style={{backgroundColor: 'blue', height: }}
        animationType="slide"
        transparent={false}
        visible={!rssPlayerState && startedSound}
      > */}
      {!rssPlayerState && startedSound && !episodePlayerState && (
        <MiniPlayer
          playSound={() => playSound()}
          restartSound={restartSound}
          changeAudioPosition={changeAudioPosition}
          slidingComplete={slidingComplete}
          pauseSound={pauseSound}
          soundDuration={soundDuration}
          soundProgress={soundProgress}
          startedSound={startedSound}
          setPlaying={setPlaying}
          setRunningEpisode={setRunningEpisode}
          playing={playing}
          episode={episodePlayerData !== undefined ? episodePlayerData : rssPlayerData.episode}
          podcast={episodePlayerData !== undefined ? episodePlayerData : rssPlayerData.podcast}
          title={episodePlayerData !== undefined ? episodePlayerData.title : rssPlayerData.episode.title}
          subtitle={episodePlayerData !== undefined ? episodePlayerData.podcast_name : rssPlayerData.podcast.title}
          optionToPause={episodePlayerData !== undefined ? false : true}
          coverArt={episodePlayerData !== undefined ? episodePlayerData.image : rssPlayerData.episode.itunes.image !== undefined? rssPlayerData.episode.itunes.image : rssPlayerData.podcast.image}
          runningEpisode={runningEpisode}
          stopSound={() => stopSoundCompletely()}
        />
      )}
      {/* </Modal> */}
      {children}
    </View>
  );
}



const App = () => {

   
  LogBox.ignoreLogs(["Setting a timer"]);
  LogBox.ignoreLogs(["ImmutableStateInvariantMiddleware"]);

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
    <Provider store={store}>
      <DataContainer>
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
            <NavigationStack.Screen
              name="PodcastDetails"
              component={PodcastDetails}
            />
            <NavigationStack.Screen
              name="EpisodeView"
              component={EpisodeView}
            />
            <NavigationStack.Screen name="RssPlayer" component={RssPlayer} />
            <NavigationStack.Screen
              name="ChooseWayOfCreatingPodcast"
              component={ChooseWayOfCreatingPodcast}
            />
            <NavigationStack.Screen
              name="CreatePodcastWithRSS"
              component={CreatePodcastWithRSS}
            />
            <NavigationStack.Screen
              name="YourPodcast"
              component={YourPodcast}
            />
            <NavigationStack.Screen
              name="CreateCommunityPremiere"
              component={CreateCommunityPremiere}
            />
            <NavigationStack.Screen
              name="PremiereAdmin"
              component={PremiereAdmin}
            />
            <NavigationStack.Screen
              name="ScheduleEpisodePremiere"
              component={ScheduleEpisodePremiere}
            />
            <NavigationStack.Screen
              name="PodcastCommunity"
              component={PodcastCommunity}
            />
            <NavigationStack.Screen
              name="AddModerator"
              component={AddModerator}
            />
            <NavigationStack.Screen
              name="ProfilePage"
              component={ProfilePage}
            />
            <NavigationStack.Screen
              name="StartEpisodePremiere"
              component={StartEpisodePremiere}
            />
            <NavigationStack.Screen
              name="EditPodcast"
              component={EditPodcast}
            />
            <NavigationStack.Screen
              name="PodcastSettings"
              component={PodcastSettings}
            />
            <NavigationStack.Screen
              name="UserSettings"
              component={UserSettings}
            />
            <NavigationStack.Screen name="EditUser" component={EditUser} />
            <NavigationStack.Screen
              name="SetupProfile"
              component={SetupProfile}
            />
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
      </DataContainer>
    </Provider>
  );
}



async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default App;