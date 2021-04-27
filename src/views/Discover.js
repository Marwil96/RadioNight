import React from "react";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import { Title } from "../components/Title";
import TopNav from "../components/TopNav";
import { Wrapper } from "../components/Wrapper";

const Discover = () => {
  return (
    <MainContainer>
      <TopNav />
      <Title style={{ marginLeft: 16, marginBottom: 24 }}>Search</Title>
      <Wrapper>
        <InputField
          style={{ marginBottom: 24 }}
          placeholder="Search after podcasts"
        />
      </Wrapper>
    </MainContainer>
  );
};

export default Discover;
