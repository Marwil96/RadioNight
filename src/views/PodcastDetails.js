import React from "react";
import colors from "../variables/color";
import InputField from "../components/InputField";
import { MainContainer } from "../components/MainContainer";
import PodcastCard from "../components/PodcastCard";
import PodcastDetailsHeader from "../components/PodcastDetailsHeader";
import { Title } from "../components/Title";
import TopNav from "../components/TopNav";

const PodcastDetails = () => {
  return (
    <MainContainer>
      <TopNav />
      <PodcastDetailsHeader
        bgColor={colors.background}
        textColor={colors.text}
        title="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        subtitle="Business & Comedy"
        desc={`The economy explained. Imagine you could call up a friend and say, "Meet me at the bar and tell me what's going on with the economy." Now imagine that's actually a fun evening.`}
      />

      <Title>Next Episode Premiere</Title>
      <PodcastCard
        title="India, Farming, and the Free Market"
        subtitle="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        desc="For decades, India has shielded its agricultural sector from the free market. Now, the government wants to let it in. Millions and millions of farmers..."
        meta1="Started  3 minuts ago"
        meta2="LIVE"
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
        title="India, Farming, and the Free Market"
        subtitle="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        desc="For decades, India has shielded its agricultural sector from the free market. Now, the government wants to let it in. Millions and millions of farmers..."
        meta1="Started  3 minuts ago"
        meta2="LIVE"
      />
      <PodcastCard
        title="India, Farming, and the Free Market"
        subtitle="Planet Money"
        image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeQypKxL8Qzjf0n28K0uUD-iVMtxcHx-G_NspdBSTCJcZv-YWh"
        desc="For decades, India has shielded its agricultural sector from the free market. Now, the government wants to let it in. Millions and millions of farmers..."
        meta1="Started  3 minuts ago"
        meta2="LIVE"
      />
    </MainContainer>
  );
};

export default PodcastDetails;
