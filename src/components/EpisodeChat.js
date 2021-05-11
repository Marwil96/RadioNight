import React, { useEffect, useState } from "react";
import colors from "../variables/color";
import { MaterialIcons } from "@expo/vector-icons";  
import styled from "styled-components/native";
import InputField from "./InputField";
import { ScrollView } from "react-native";
import { AddChatMessage, GetChatMessages } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const ChatHeader = styled.View`
  background-color: #EFEFF1;
  padding: 12px 16px;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  bottom: 0;
  flex-shrink: 1;
  /* min-height: 100%; */
  min-height: 350px;
  max-height: 100%;
  height: 100%;
`

const ChatHeaderTitle = styled.Text`
  font-size: 18px;
  font-family: "Manrope_400Regular";
  color: #000000;
`;

const ChatWrapper = styled.View`
  background-color: #f6f6f6;
  /* background-color: #D7D7D7; */
  width: 100%;
  max-height: 500px;
  height: 100%;
  flex-shrink: 1;
  padding: 16px 16px;
  flex: 1;
`;

const MessageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  background-color: white;
  flex-shrink: 1;
  bottom: 24px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
`

const ChatButton = styled.TouchableOpacity`
  width: 51px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efeff1;
  border-radius: 8px;
`;

const MessageText = styled.Text`
  font-size: 14px;
  color: #000;
  font-family: "Manrope_400Regular";
  margin-right: 8px;
  margin-bottom: 12px;
`;

const MessageStrong = styled.Text`
  font-size: 14px;
  color: #7b61ff;
  font-family: "Manrope_700Bold";
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

const MessageField = ({userId, episodeId, userName}) => {
  const [message, setMessage] = useState("");

  return (
    <MessageWrapper>
      <InputField  value={message} onChangeText={(text) => setMessage(text)} placeholder="Give your opinion" style={{ flexShrink: 1, marginRight: 12, backgroundColor: '#EFEFF1', color: '#000', height: 46 }} />
      <ChatButton onPress={() => {AddChatMessage({message: message, episodeId:episodeId, messageAuthor:{user_name: userName, user_id: userId}}), setMessage('')}}>
        <MaterialIcons name="keyboard-arrow-right" size={20} color={colors.primary} />
      </ChatButton>
    </MessageWrapper>
  );
}

const Message = ({user, message}) => {
  // const color = colorArray[Math.floor(Math.random() * colorArray.length) + 0];
 return <MessageText ><MessageStrong style={{color: colors.primary}}>{user}</MessageStrong>: {message}</MessageText>
}


const EpisodeChat = ({episodeId}) => {
  const dispatch = useDispatch();
  const { chatMessages, user_data } = useSelector((state) => state.DatabaseReducer);

  useEffect(() => {
    console.log('EPISODE ID', episodeId)
    if(episodeId !== undefined) {
      dispatch(GetChatMessages({episodeId: episodeId}))
    }
  }, [episodeId])


  return (
    <Wrapper>
      <ChatHeader
        style={{ borderBottomColor: "#A8A8A9", borderBottomWidth: 1 }}
      >
        <ChatHeaderTitle>Chat</ChatHeaderTitle>
      </ChatHeader>
      <ChatWrapper style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {chatMessages !== undefined && chatMessages.length > 0 && chatMessages.map(({message, message_author}, index) => <Message message={message} key={index} user={message_author.user_name} />)}
        </ScrollView>
      </ChatWrapper>
      <MessageField userId={user_data?.user_id} episodeId={episodeId} userName={user_data?.user_name} />
    </Wrapper>
  );
};

export default EpisodeChat;
