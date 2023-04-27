import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function AppIcon({ appname, icon, link }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };
  return (
    <Flex flexDir={"column"} alignItems={"center"}>
      <Flex justifyContent={"center"} alignItems={"center"} h="80px" w="80px" mt="4" mx="2" rounded={"md"} bgColor={"darkslateblue"} onClick={handleClick} cursor={"pointer"} _hover={{opacity:"0.8"}} shadow={"md"} overflow={"hidden"}>
        {/* <Image h="full" w="full" objectFit="cover" src={icon ? icon : "https://placehold.co/600x400"} alt={"image of :"+appname}/> */}
        {icon && icon}
      </Flex>
      <Text>{appname}</Text>
    </Flex>
  );
}

export default AppIcon;
