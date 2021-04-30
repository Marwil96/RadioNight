import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../actions';
import { MainContainer } from '../components/MainContainer';
import PodcastCard from '../components/PodcastCard';
import { Title } from '../components/Title';
import TopNav from '../components/TopNav';


const Home = ({ navigation }) => {
  return (
    <MainContainer player>
      <TopNav />
      <Title style={{ marginLeft: 16, marginBottom: 24 }}>Live Episode Premieres</Title>
      <PodcastCard
        title="Abbi Jacobsond "
        subtitle="Conan O’Brien, Needs a friend"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSfHG4Hb0Cbz4cZSb_syTrBqwXltb3i-La779QE549yMC81vI"
        desc="Writer, comedian, and actress Abbi Jacobson feels scrumptious about being Conan O'Brien's friend. Abbi sits down with Conan to... "
        meta1="Started 1 minuts ago"
        meta2="LIVE"
        onPress={() => navigation.navigate("EpisodeView")}
      />

      <PodcastCard
        title="India, Farming, and the Free Market"
        subtitle="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        desc="For decades, India has shielded its agricultural sector from the free market. Now, the government wants to let it in. Millions and millions of farmers..."
        meta1="Started  3 minuts ago"
        meta2="LIVE"
      />

      <PodcastCard
        title="Welcome to Jurassic Art Redux"
        subtitle="99% Invisible"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTy7v2Vrnp5LhNS7JoKB12kyK9_gxyCjbGFdDf7MkMmXEfvo8XY"
        desc="Kurt and Roman talk about icebergs and how we visualize them all wrong."
        meta1="Started 15 minuts ago"
        meta2="LIVE"
      />

      <Title style={{ marginBottom: 24 }}>Catch up on missed shows</Title>
      <PodcastCard
        title="India, Farming, and the Free Market"
        subtitle="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        desc="For decades, India has shielded its agricultural sector from the free market. Now, the government wants to let it in. Millions and millions of farmers..."
        meta1="Started  3 minuts ago"
        meta2="LIVE"
        style={{ marginBottom: 32 }}
      />

      <PodcastCard
        title="Welcome to Jurassic Art Redux"
        subtitle="99% Invisible"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTy7v2Vrnp5LhNS7JoKB12kyK9_gxyCjbGFdDf7MkMmXEfvo8XY"
        desc="Kurt and Roman talk about icebergs and how we visualize them all wrong."
        meta1="Started 15 minuts ago"
        meta2="LIVE"
      />

      <Title style={{ marginBottom: 24 }}>You might like this</Title>
      <PodcastCard
        title="India, Farming, and the Free Market"
        subtitle="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        desc="For decades, India has shielded its agricultural sector from the free market. Now, the government wants to let it in. Millions and millions of farmers..."
        meta1="Started  3 minuts ago"
        meta2="LIVE"
        style={{ marginBottom: 32 }}
      />
    </MainContainer>
  );
};

export default Home;