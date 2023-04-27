import React from "react";
import { FullPage } from "../Components/FullPage";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import useSound from "use-sound";
import rickrollSound from "./../assets/rickroll.mp3";
import { toast } from "react-toastify";

function Fun() {
    const [playSound] = useSound(rickrollSound);
    const handleClick = () => {
        console.log("test")
        playSound();
        toast("LLLLL hahaha uve been rickrolled by ferrois (pls on ur volume)")
    };
  return (
    <FullPage>
      <Flex h="full" w="full" justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
        <Heading>Sus Button</Heading>
        <Box cursor="pointer" h="40" w="40" bgColor={"red"} rounded={"full"} borderWidth={"5px"} borderColor={"blackAlpha.500"} _hover={{transform : "scale(1.05)", transition: "0.4s"}} onClick={handleClick}></Box>
        <Text fontSize={"2xl"}>DO NOT PRESS ME!</Text>
      </Flex>
    </FullPage>
  );
}

export default Fun;
