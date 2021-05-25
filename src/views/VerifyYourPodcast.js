import React from 'react';
import { MainContainer } from '../components/MainContainer';
import StyledButton from '../components/StyledButton';
import { Title } from '../components/Title';
import { Wrapper } from '../components/Wrapper';
import * as Linking from "expo-linking";
import { TouchableHighlight, Text, TouchableOpacity } from 'react-native';
import colors from '../variables/color';

const VerifyYourPodcast = ({navigation}) => {
  return (
    <MainContainer>
      <Wrapper style={{ marginTop: 64 }}>
        <Title style={{ marginBottom: 32 }}>
          You need to verify your ownership over this podcast.
        </Title>
        <Title style={{ marginBottom: 32 }}>
          Check the email connected to the podcast and restart the app. If it still dont work feel
          free to contact us at{" "}
          <Text
            style={{
              textDecorationLine: 'underline',
              color: colors.primary
            }}
            onPress={() => Linking.openURL("mailto: info@ohhi.se")}
          >
            info@ohhi.se
          </Text>
        </Title>
        <StyledButton primary onPress={() => navigation.goBack()}>
          Go Back
        </StyledButton>
      </Wrapper>
    </MainContainer>
  );
}

export default VerifyYourPodcast;