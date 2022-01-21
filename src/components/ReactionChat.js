import React, { useEffect, useState } from "react";
import colors from "../variables/color";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import InputField from "./InputField";
import { ScrollView, TouchableOpacity, View } from "react-native";
// import 'react-native-get-random-values';
import { nanoid } from "nanoid/non-secure";

import {
  AddChatMessage,
  FetchPodcastData,
  GetChatMessages,
  AddUserToBanList,
  FetchUserData,
  RemoveChatMessage,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "./Title";
import { Span } from "./Span";
import StyledButton from "./StyledButton";
import { AnimatePresence, MotiView } from "moti";

const allSmileys = ["😂", "😍", "😭", "🤬", "❤️", "👍"];

const ChatHeader = styled.View`
  background-color: #000;
  padding: 12px 16px;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  bottom: 0;
  flex-shrink: 1;
  background-color: #000;
  /* min-height: 100%; */
  flex-grow: 1;
  /* max-height: 100%; */
  height: 100%;
`;

const ChatHeaderTitle = styled.Text`
  font-size: 18px;
  font-family: "Manrope_400Regular";
  color: #000000;
`;

const ChatWrapper = styled.View`
  background-color: #000;
  /* background-color: #D7D7D7; */
  width: 100%;
  /* max-height: 500px; */
  height: 100%;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  padding: 16px 16px;
  flex: 1;
`;

const MessageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  background-color: #000;
  flex-shrink: 1;
  bottom: 24px;
  position: absolute;
  bottom: 16px;
  width: 100%;
  /* height: 80px; */
  z-index: 100;
`;

const ChatButton = styled.TouchableOpacity`
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
`;

const MessageText = styled.Text`
  font-size: 18px;
  color: #FFF;
  font-family: "Manrope_500Medium";
`;

const MessageStrong = styled.Text`
  font-size: 12px;
  color: #f99d5b;
  margin-bottom: 2px;
  font-family: "Manrope_400Regular";
`;

const MessageContainer = styled.View`
  width: 100%;
  padding: 12px 14px;
  display: flex;
  flex-direction: row;
  background-color: #efeff1;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
`;

const Smiley = styled.Text`
  font-size: 28px;
  /* margin-right: 10px; */
`

const BigChatSmiley = styled.Text`
  font-size: 48px;
  color: white;
  position: absolute;
  bottom: 0;
`

const TextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  background-color: #FF6A00;
  /* width: 105px; */
  position: absolute;
  border-radius: 8px;
`;

const colorArray = [
  "#FF6A00",
  "#00B2FF",
  "#0500FF",
  "#44F6CD",
  "#70906E",
  "#7B61FF",
  "#FF00C7",
  "#FFB61D",
];

const MessageField = ({ userId, episodeId, userName, isMod }) => {
  const [message, setMessage] = useState("");
  const [smileyMode, setSmileyMode] = useState(true)

  return (
    <MessageWrapper>
      {smileyMode ? (
        <MessageContainer>
          {allSmileys.map((smiley, index) => (
            <TouchableOpacity>
              <Smiley
                key={index}
                onPress={() => {
                  AddChatMessage({
                    isMod: isMod,
                    message: smiley,
                    episodeId: episodeId,
                    messageAuthor: { user_name: userName, user_id: userId },
                  })
                }}
              >
                {smiley}
              </Smiley>
            </TouchableOpacity>
          ))}
          <ChatButton onPress={() => setSmileyMode(false)}>
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              color={colors.primary}
            />
          </ChatButton>
        </MessageContainer>
      ) : (
        <MessageContainer>
          {message.length === 0 && (
            <ChatButton
              onPress={() => {
                setSmileyMode(true);
              }}
              style={{ marginRight: 12 }}
            >
              <MaterialIcons
                name="emoji-emotions"
                size={20}
                color={colors.primary}
              />
            </ChatButton>
          )}
          <InputField
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="Give your opinion"
            style={{
              flexShrink: 1,
              marginRight: 12,
              backgroundColor: "#fff",
              color: "#000",
              height: 46,
            }}
          />
          <ChatButton
            onPress={() => {
              AddChatMessage({
                isMod: isMod,
                message: message,
                episodeId: episodeId,
                messageAuthor: { user_name: userName, user_id: userId },
              }),
                setMessage("");
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color={colors.primary}
            />
          </ChatButton>
        </MessageContainer>
      )}
    </MessageWrapper>
  );
};

const Message = ({ user, message, onNamePress, isMod, timeStamp }) => {
  // const color = colorArray[Math.floor(Math.random() * colorArray.length) + 0];
  const isSmiley = allSmileys.includes(message);
  const currentTime = Date.now();
  const currentTimeinSeconds = Math.floor(currentTime / 1000);
  const timeStampInSeconds = Math.floor(timeStamp / 1000);
  const timeDifference = currentTimeinSeconds - timeStampInSeconds;
  const randomNumber = Math.random();
  const horizontalNumber = randomNumber * 200;
  console.log(randomNumber)

  return isSmiley ? (
    <MotiView
      transition={{
        // default settings for all style values
        type: "timing",
        duration: 4550,
        // set a custom transition for scale
        scale: {
          type: "timing",
          delay: 2500,
          duration: 500,
        },
      }}
      from={{ translateY: 70, translateX: horizontalNumber, scale: 1 }}
      animate={{ translateY: -600, translateX: horizontalNumber, scale: 0 }}
    >
      <BigChatSmiley>
        {message}
      </BigChatSmiley>
    </MotiView>
  ) : (
    <TouchableOpacity onPress={onNamePress}>
      {/* {isMod && (
        <MaterialIcons
          name="security"
          size={14}
          color={colors.primary}
          style={{ marginRight: 4 }}
        />
      )} */}
      <TextWrapper>
        <MessageStrong>{user}</MessageStrong>
        <MessageText>{message}</MessageText>
      </TextWrapper>
    </TouchableOpacity>
  );
};

const ReactionChat = ({ episodeId, podcastId, officialBroadCast, owner }) => {
  const dispatch = useDispatch();
  const { chatMessages, user_data } = useSelector(
    (state) => state.DatabaseReducer
  );
  const [podcastData, setPodcastData] = useState(false);
  const [modControls, openModControls] = useState({
    state: false,
    user: false,
  });
  const [isMod, setIsMod] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    if (episodeId !== undefined) {
      dispatch(GetChatMessages({ episodeId: episodeId }));
    }
  }, [episodeId]);

  useEffect(() => {
    setAllMessages(chatMessages)
  }, [chatMessages])

  // useEffect(() => console.log("re-render because x changed:", x), [openModControls]);

  useEffect(() => {
    const FetchData = async () => {
      const podcastData = officialBroadCast
        ? await FetchPodcastData(podcastId)
        : await FetchUserData(owner);
      console.log(
        podcastData.mods,
        user_data.user_id,
        podcastData.mods.includes(user_data.user_id)
      );
      setIsMod(podcastData.mods.includes(user_data.user_id));
      setIsBanned(podcastData.banned_users.includes(user_data.user_id));
      setPodcastData(podcastData);
    };

    FetchData();
  }, []);

  if (modControls.state) {
    return (
      <Wrapper style={{ padding: 16 }}>
        <Title>Mod Controls</Title>
        <StyledButton
          style={{ marginBottom: 16 }}
          primary
          onPress={() => {
            RemoveChatMessage({
              episodeId: episodeId,
              messageId: modControls.chat_id,
            });
            openModControls({ state: false, user: false });
          }}
        >
          Remove Message
        </StyledButton>
        <StyledButton
          style={{ marginBottom: 16 }}
          onPress={() => {
            AddUserToBanList({
              collection: officialBroadCast ? "podcasts" : "users",
              user_id: modControls.user.user_id,
              podcast_id: officialBroadCast ? podcastData.id : owner,
            });
            openModControls({ state: false, user: false });
          }}
        >
          Ban {modControls.user.user_name}
        </StyledButton>
        <StyledButton
          onPress={() => openModControls({ state: false, user: false })}
        >
          Go Back To Chat
        </StyledButton>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <ChatHeader>
          <ChatHeaderTitle>Chat</ChatHeaderTitle>
        </ChatHeader>
        <ChatWrapper style={{ flex: 1 }}>
          <AnimatePresence>
            {/* <View contentContainerStyle={{ flexGrow: 1 }}> */}
            {allMessages !== undefined &&
              allMessages.length > 0 &&
              [...allMessages].map(
                (
                  { message, message_author, chat_id, isMod, time_stamp },
                  index
                ) => (
                  <Message
                    onNamePress={() =>
                      openModControls({
                        state: true,
                        user: message_author,
                        chat_id: chat_id,
                      })
                    }
                    message={message}
                    isMod={isMod}
                    key={chat_id}
                    user={message_author.user_name}
                    timeStamp={time_stamp}
                  />
                )
              )}
            {/* </View> */}
          </AnimatePresence>
        </ChatWrapper>
        {!isBanned ? (
          <MessageField
            isMod={isMod}
            userId={user_data?.user_id}
            episodeId={episodeId}
            userName={user_data?.user_name}
          />
        ) : (
          <Span style={{ marginLeft: 16, paddingTop: 12, paddingBottom: 12 }}>
            You are banned from writing in chat
          </Span>
        )}
      </Wrapper>
    );
  }
};

export default ReactionChat;
