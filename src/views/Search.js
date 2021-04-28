import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import { MainContainer } from '../components/MainContainer';
import { Title } from '../components/Title';
import { Wrapper } from '../components/Wrapper';

const TopBar = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const Search = () => {
  return (
    <MainContainer>
      <Wrapper>
        <TopBar>
          <ButtonContainer onPress={() => navigation.goBack()}>
            <AntDesign
              style={{ marginRight: 12 }}
              name="back"
              size={24}
              color="white"
            />
            <Title style={{ fontSize: 16 }}>Go Back</Title>
          </ButtonContainer>
        </TopBar>
      </Wrapper>
    </MainContainer>
  );
}

export default Search;