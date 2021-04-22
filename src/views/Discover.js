import React from "react";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import { Title } from "../components/Title";
import TopNav from "../components/TopNav";

const Discover = () => {
  return (
    <MainContainer>
      <TopNav />
      <Title style={{ marginBottom: 24 }}>Search</Title>
      <InputField
        style={{ marginBottom: 24 }}
        placeholder="Search after podcasts"
      />
    </MainContainer>
  );
};

export default Discover;
