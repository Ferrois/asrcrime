import React from "react";
import { FullPage } from "../../Components/FullPage";
import { Box, Flex, Grid } from "@chakra-ui/react";
import AppIcon from "../../Components/AppIcon";
import PhoneHead from "../../Components/PhoneHead";
import { AiFillInfoCircle, AiFillTrophy } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import { BsRocketTakeoffFill, BsFillChatDotsFill } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";

function Home() {
  return (
    <FullPage>
      <PhoneHead />
      <Flex flexWrap={"wrap"} justifyContent={"space-evenly"}>
        <AppIcon appname="My Score" icon={<AiFillTrophy size={50} />} link="/score" />
        <AppIcon appname="Clues" icon={<SlMagnifier size={50} />} link="/clue" />
        <AppIcon appname="Info" icon={<AiFillInfoCircle size={50} />} link="/info" />
        <AppIcon appname="Fun" icon={<BsRocketTakeoffFill size={50} />} link="/fun" />
        <AppIcon appname="Venues & Games" icon={<FaLocationArrow size={50} />} link="/venues" />
        <AppIcon appname="Chat" icon={<BsFillChatDotsFill size={50} />} link="/chat" />
      </Flex>
    </FullPage>
  );
}

export default Home;
